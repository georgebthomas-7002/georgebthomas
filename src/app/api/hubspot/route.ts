import { NextRequest, NextResponse } from 'next/server'

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
    if (data.howHeard) properties.how_did_you_hear_about_us = data.howHeard

    // For contact form - add message
    if (data.formType === 'contact' && data.message) {
      properties.message = data.message
      properties.hs_lead_status = 'NEW'
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

    if (!response.ok) {
      // Handle duplicate contact (409 conflict) - try to update instead
      if (response.status === 409) {
        const updateResponse = await updateExistingContact(
          hubspotToken,
          data.email,
          properties
        )
        if (updateResponse.ok) {
          return NextResponse.json({ success: true, updated: true })
        }
      }

      const errorData = await response.json()
      console.error('HubSpot API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })

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
