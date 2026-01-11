import { NextRequest, NextResponse } from 'next/server'

// Pipeline and stage IDs
const PIPELINES = {
  speaking: {
    id: '853766152',
    firstStage: '1272766045', // New Inquiry
  },
  coaching: {
    id: '853766153',
    firstStage: '1272766053', // Application Received
  },
}

// Notification email (George's email for internal alerts)
const NOTIFICATION_EMAIL = process.env.HUBSPOT_NOTIFICATION_EMAIL || 'george@georgebthomas.com'

interface ContactFormData {
  formType: 'contact' | 'booking' | 'coaching'
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  message?: string
  // Booking-specific fields
  engagementType?: string
  eventName?: string
  eventDate?: string
  eventLocation?: string
  audienceSize?: string
  topicsOfInterest?: string[]
  budgetRange?: string
  eventDetails?: string
  howHeard?: string
  // Coaching-specific fields
  coachingPackage?: string
  coachingPackageLabel?: string
  coachingTopics?: string[]
  coachingGoals?: string
  topicAnswers?: Record<string, string>
  role?: string
  preferredTime?: string
  price?: number
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN

    if (!hubspotToken) {
      console.error('HUBSPOT_PRIVATE_APP_TOKEN not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Map form fields to HubSpot contact properties
    const properties: Record<string, string> = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
    }

    // Optional contact fields
    if (data.phone) properties.phone = data.phone
    if (data.company) properties.company = data.company
    if (data.howHeard) properties.how_did_you_hear_about_us_ = data.howHeard

    // For contact form - add message and set inquiry type for workflow trigger
    if (data.formType === 'contact') {
      if (data.message) properties.message = data.message
      properties.hs_lead_status = 'NEW'
      properties.inquiry_type = 'general_inquiry'
    }

    // For booking form - build comprehensive note
    if (data.formType === 'booking') {
      properties.hs_lead_status = 'NEW'
      properties.inquiry_type = 'speaking_inquiry'

      // Set custom properties for speaking inquiries
      if (data.engagementType) properties.engagement_type = data.engagementType
      if (data.budgetRange) properties.speaking_budget_range = data.budgetRange
      if (data.eventDate) properties.event_date = data.eventDate
      if (data.eventLocation) properties.event_location = data.eventLocation
      if (data.audienceSize) properties.audience_size = data.audienceSize

      // Build booking inquiry note
      const bookingNote = buildBookingNote(data)
      properties.notes_last_contacted = bookingNote
    }

    // For coaching application - use custom properties
    if (data.formType === 'coaching') {
      properties.hs_lead_status = 'NEW'
      properties.inquiry_type = 'coaching_application'

      // Set coaching-specific custom properties
      if (data.coachingPackage) properties.coaching_package = data.coachingPackage
      if (data.coachingTopics?.length) {
        properties.coaching_topics = data.coachingTopics.join(';')
      }
      if (data.preferredTime) properties.preferred_meeting_time = data.preferredTime
      if (data.role) properties.jobtitle = data.role

      // Build coaching application note with all details
      const coachingNote = buildCoachingNote(data)
      properties.notes_last_contacted = coachingNote
    }

    // Create contact via HubSpot API
    const response = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      }
    )

    let contactId: string | null = null

    if (!response.ok) {
      // Handle duplicate contact (409 conflict) - try to update instead
      if (response.status === 409) {
        const existingContact = await findContactByEmail(hubspotToken, data.email)
        if (existingContact) {
          contactId = existingContact.id
          const updateResponse = await updateExistingContact(
            hubspotToken,
            data.email,
            properties
          )
          if (!updateResponse.ok) {
            const errorData = await updateResponse.json()
            console.error('HubSpot update error:', errorData)
            return NextResponse.json(
              { error: 'Failed to update contact' },
              { status: updateResponse.status }
            )
          }
        }
      } else {
        const errorData = await response.json()
        console.error('HubSpot API error:', errorData)
        return NextResponse.json(
          { error: 'Failed to submit form' },
          { status: response.status }
        )
      }
    } else {
      const contactData = await response.json()
      contactId = contactData.id
    }

    // Create deal for booking/coaching inquiries
    if (contactId && (data.formType === 'booking' || data.formType === 'coaching')) {
      try {
        await createDealForInquiry(hubspotToken, contactId, data)
      } catch (error) {
        console.error('Failed to create deal:', error)
        // Don't fail the request, deal creation is secondary
      }
    }

    // Send internal notification for all form types
    try {
      await sendInternalNotification(hubspotToken, contactId, data)
    } catch (error) {
      console.error('Failed to send notification:', error)
      // Don't fail the request, notification is secondary
    }

    return NextResponse.json({ success: true, contactId })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function buildBookingNote(data: ContactFormData): string {
  const engagementLabels: Record<string, string> = {
    'podcast': 'Podcast Guest Appearance',
    'keynote': 'Event Stage / Keynote',
    'workshop': 'Corporate Workshop / Training',
    'virtual': 'Virtual Keynote / Webinar',
  }

  const lines = [
    `=== BOOKING INQUIRY ===`,
    `Submitted: ${new Date().toLocaleString()}`,
    ``,
    `ENGAGEMENT DETAILS`,
    `Type: ${data.engagementType ? engagementLabels[data.engagementType] || data.engagementType : 'Not specified'}`,
    `Event Name: ${data.eventName || 'Not specified'}`,
    `Event Date: ${data.eventDate || 'Not specified'}`,
    `Location: ${data.eventLocation || 'Not specified'}`,
    `Audience Size: ${data.audienceSize || 'Not specified'}`,
    ``,
    `TOPICS OF INTEREST`,
    data.topicsOfInterest?.length ? data.topicsOfInterest.join(', ') : 'None selected',
    ``,
    `ADDITIONAL INFO`,
    `Budget Range: ${data.budgetRange || 'Not specified'}`,
    ``,
    `EVENT DETAILS`,
    data.eventDetails || 'None provided',
    ``,
    `SOURCE: ${data.howHeard || 'Not specified'}`,
  ]

  return lines.join('\n')
}

async function updateExistingContact(
  token: string,
  email: string,
  properties: Record<string, string>
): Promise<Response> {
  // First, search for the contact by email
  const searchResponse = await fetch(
    'https://api.hubapi.com/crm/v3/objects/contacts/search',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: email,
          }],
        }],
      }),
    }
  )

  if (!searchResponse.ok) return searchResponse

  const searchData = await searchResponse.json()
  if (searchData.total === 0) {
    return new Response(null, { status: 404 })
  }

  const contactId = searchData.results[0].id

  // Update the existing contact
  return fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    }
  )
}

function buildCoachingNote(data: ContactFormData): string {
  const packageLabels: Record<string, string> = {
    'activation': 'Activation Meeting ($99)',
    'starter': 'Starter Package ($2,000)',
    'growth': 'Growth Package ($4,000)',
    'transformation': 'Transformation Package ($6,000)',
  }

  const topicLabels: Record<string, string> = {
    'hubspot': 'HubSpot Strategy & Implementation',
    'video': 'Video Marketing Mastery',
    'podcast': 'Podcasting Excellence',
    'ai': 'AI Integration & Strategy',
    'transformation': 'Personal Transformation',
    'marketing': 'Marketing & Content Strategy',
  }

  const lines = [
    `=== COACHING APPLICATION ===`,
    `Submitted: ${new Date().toLocaleString()}`,
    ``,
    `PACKAGE SELECTED`,
    data.coachingPackage
      ? packageLabels[data.coachingPackage] || data.coachingPackageLabel || data.coachingPackage
      : 'Not specified',
    data.price ? `Price: $${data.price}` : '',
    ``,
    `COACHING FOCUS AREAS`,
    data.coachingTopics?.length
      ? data.coachingTopics.map(t => topicLabels[t] || t).join(', ')
      : 'None selected',
    ``,
    `GOALS & OBJECTIVES`,
    data.coachingGoals || 'None provided',
    ``,
  ]

  // Add topic-specific answers if present
  if (data.topicAnswers && Object.keys(data.topicAnswers).length > 0) {
    lines.push(`TOPIC-SPECIFIC RESPONSES`)
    for (const [question, answer] of Object.entries(data.topicAnswers)) {
      lines.push(`${question}:`)
      lines.push(`  ${answer}`)
    }
    lines.push(``)
  }

  lines.push(
    `CONTACT PREFERENCES`,
    `Role: ${data.role || 'Not specified'}`,
    `Preferred Time: ${data.preferredTime || 'Not specified'}`,
    ``,
    `SOURCE: ${data.howHeard || 'Not specified'}`,
  )

  return lines.filter(line => line !== '').join('\n')
}

async function findContactByEmail(
  token: string,
  email: string
): Promise<{ id: string } | null> {
  const searchResponse = await fetch(
    'https://api.hubapi.com/crm/v3/objects/contacts/search',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: email,
          }],
        }],
      }),
    }
  )

  if (!searchResponse.ok) return null

  const searchData = await searchResponse.json()
  if (searchData.total === 0) return null

  return { id: searchData.results[0].id }
}

async function createDealForInquiry(
  token: string,
  contactId: string,
  data: ContactFormData
): Promise<void> {
  const isBooking = data.formType === 'booking'
  const pipeline = isBooking ? PIPELINES.speaking : PIPELINES.coaching

  // Build deal name
  const dealName = isBooking
    ? `${data.firstName} ${data.lastName} - Speaking Inquiry${data.eventName ? ` (${data.eventName})` : ''}`
    : `${data.firstName} ${data.lastName} - Coaching Application${data.coachingPackageLabel ? ` (${data.coachingPackageLabel})` : ''}`

  // Build deal properties
  const dealProperties: Record<string, string | number> = {
    dealname: dealName,
    pipeline: pipeline.id,
    dealstage: pipeline.firstStage,
  }

  // Add amount if available (coaching price)
  if (data.price) {
    dealProperties.amount = data.price
  }

  // Create the deal
  const dealResponse = await fetch(
    'https://api.hubapi.com/crm/v3/objects/deals',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: dealProperties }),
    }
  )

  if (!dealResponse.ok) {
    const errorData = await dealResponse.json()
    throw new Error(`Failed to create deal: ${JSON.stringify(errorData)}`)
  }

  const dealData = await dealResponse.json()
  const dealId = dealData.id

  // Associate deal with contact
  await fetch(
    `https://api.hubapi.com/crm/v4/objects/deals/${dealId}/associations/contacts/${contactId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          associationCategory: 'HUBSPOT_DEFINED',
          associationTypeId: 3, // Deal to Contact
        },
      ]),
    }
  )

  console.log(`Created deal ${dealId} and associated with contact ${contactId}`)
}

async function sendInternalNotification(
  token: string,
  contactId: string | null,
  data: ContactFormData
): Promise<void> {
  // Create a task as notification (tasks trigger HubSpot notifications)
  const formTypeLabels: Record<string, string> = {
    contact: 'Contact Form',
    booking: 'Speaking Inquiry',
    coaching: 'Coaching Application',
  }

  const taskSubject = `New ${formTypeLabels[data.formType]} from ${data.firstName} ${data.lastName}`

  let taskBody = `A new ${formTypeLabels[data.formType].toLowerCase()} was submitted.\n\n`
  taskBody += `Name: ${data.firstName} ${data.lastName}\n`
  taskBody += `Email: ${data.email}\n`
  if (data.phone) taskBody += `Phone: ${data.phone}\n`
  if (data.company) taskBody += `Company: ${data.company}\n`

  if (data.formType === 'booking') {
    taskBody += `\nEngagement Type: ${data.engagementType || 'Not specified'}\n`
    taskBody += `Event: ${data.eventName || 'Not specified'}\n`
    taskBody += `Date: ${data.eventDate || 'Not specified'}\n`
    taskBody += `Budget: ${data.budgetRange || 'Not specified'}\n`
  }

  if (data.formType === 'coaching') {
    taskBody += `\nPackage: ${data.coachingPackageLabel || data.coachingPackage || 'Not specified'}\n`
    if (data.price) taskBody += `Price: $${data.price}\n`
    taskBody += `Topics: ${data.coachingTopics?.join(', ') || 'Not specified'}\n`
  }

  if (data.formType === 'contact' && data.message) {
    taskBody += `\nMessage:\n${data.message}\n`
  }

  const taskProperties: Record<string, string> = {
    hs_task_subject: taskSubject,
    hs_task_body: taskBody,
    hs_task_status: 'NOT_STARTED',
    hs_task_priority: data.formType === 'contact' ? 'MEDIUM' : 'HIGH',
    hs_task_type: 'TODO',
    hs_timestamp: new Date().toISOString(),
  }

  const taskResponse = await fetch(
    'https://api.hubapi.com/crm/v3/objects/tasks',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: taskProperties }),
    }
  )

  if (!taskResponse.ok) {
    const errorData = await taskResponse.json()
    throw new Error(`Failed to create task: ${JSON.stringify(errorData)}`)
  }

  const taskData = await taskResponse.json()
  const taskId = taskData.id

  // Associate task with contact if we have a contact ID
  if (contactId) {
    await fetch(
      `https://api.hubapi.com/crm/v4/objects/tasks/${taskId}/associations/contacts/${contactId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 204, // Task to Contact
          },
        ]),
      }
    )
  }

  console.log(`Created notification task ${taskId}`)
}
