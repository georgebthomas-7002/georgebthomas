import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  formType: 'contact' | 'booking'
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

      // Build booking inquiry note
      const bookingNote = buildBookingNote(data)

      // Store the full booking details in notes
      // Note: These are standard HubSpot properties. For custom properties,
      // they would need to be created in HubSpot first.
      properties.notes_last_contacted = bookingNote
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
