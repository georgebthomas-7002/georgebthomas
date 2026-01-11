/**
 * HubSpot Phase 1 Setup Script
 *
 * This script creates all the foundational HubSpot components needed for
 * the George B. Thomas website integration:
 *
 * 1. Custom Contact Properties (10 properties)
 * 2. Custom Deal Properties (9 properties)
 * 3. Speaking Engagements Pipeline (8 stages)
 * 4. Coaching Sales Pipeline (8 stages)
 *
 * Run with: npx ts-node scripts/hubspot-setup.ts
 *
 * Requires: HUBSPOT_PRIVATE_APP_TOKEN in .env.local
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local (Next.js convention)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const BASE_URL = 'https://api.hubapi.com';

if (!HUBSPOT_TOKEN) {
  console.error('❌ HUBSPOT_PRIVATE_APP_TOKEN is not set in environment variables');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
  'Content-Type': 'application/json',
};

// ============================================================================
// CONTACT PROPERTIES
// ============================================================================

const contactProperties = [
  {
    name: 'lead_source',
    label: 'Lead Source',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'contactinformation',
    description: 'How the contact found George B. Thomas',
    options: [
      { label: 'Podcast', value: 'podcast' },
      { label: 'HubSpot Community', value: 'hubspot_community' },
      { label: 'INBOUND', value: 'inbound_event' },
      { label: 'Social Media', value: 'social_media' },
      { label: 'Referral', value: 'referral' },
      { label: 'Google Search', value: 'google_search' },
      { label: 'Event', value: 'event' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    name: 'inquiry_type',
    label: 'Inquiry Type',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'contactinformation',
    description: 'Type of inquiry from the website',
    options: [
      { label: 'General Contact', value: 'general_contact' },
      { label: 'Speaking Inquiry', value: 'speaking_inquiry' },
      { label: 'Coaching Application', value: 'coaching_application' },
    ],
  },
  {
    name: 'engagement_type',
    label: 'Engagement Type',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'contactinformation',
    description: 'Type of speaking engagement requested',
    options: [
      { label: 'Podcast Guest', value: 'podcast_guest' },
      { label: 'Keynote/Stage', value: 'keynote_stage' },
      { label: 'Workshop/Training', value: 'workshop_training' },
      { label: 'Virtual Keynote', value: 'virtual_keynote' },
    ],
  },
  {
    name: 'speaking_budget_range',
    label: 'Speaking Budget Range',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'contactinformation',
    description: 'Budget range for speaking engagement',
    options: [
      { label: 'Under $5K', value: 'under_5k' },
      { label: '$5K - $10K', value: '5k_10k' },
      { label: '$10K - $20K', value: '10k_20k' },
      { label: '$20K+', value: '20k_plus' },
      { label: "Let's Discuss", value: 'lets_discuss' },
    ],
  },
  {
    name: 'coaching_package',
    label: 'Coaching Package',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'contactinformation',
    description: 'Selected coaching package',
    options: [
      { label: 'Activation ($99)', value: 'activation' },
      { label: 'Starter ($2,000)', value: 'starter' },
      { label: 'Growth ($4,000)', value: 'growth' },
      { label: 'Transformation ($6,000)', value: 'transformation' },
    ],
  },
  {
    name: 'coaching_topics',
    label: 'Coaching Topics',
    type: 'enumeration',
    fieldType: 'checkbox',
    groupName: 'contactinformation',
    description: 'Areas of coaching interest',
    options: [
      { label: 'HubSpot Strategy', value: 'hubspot_strategy' },
      { label: 'Video Marketing', value: 'video_marketing' },
      { label: 'Podcasting', value: 'podcasting' },
      { label: 'AI Integration', value: 'ai_integration' },
      { label: 'Personal Transformation', value: 'personal_transformation' },
      { label: 'Marketing Strategy', value: 'marketing_strategy' },
    ],
  },
  {
    name: 'preferred_meeting_time',
    label: 'Preferred Meeting Time',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'contactinformation',
    description: 'Preferred time for meetings',
    options: [
      { label: 'Morning', value: 'morning' },
      { label: 'Afternoon', value: 'afternoon' },
      { label: 'Evening', value: 'evening' },
      { label: 'Flexible', value: 'flexible' },
    ],
  },
  {
    name: 'event_date',
    label: 'Event Date',
    type: 'date',
    fieldType: 'date',
    groupName: 'contactinformation',
    description: 'Date of the speaking event',
  },
  {
    name: 'event_location',
    label: 'Event Location',
    type: 'string',
    fieldType: 'text',
    groupName: 'contactinformation',
    description: 'Location/venue for the speaking event',
  },
  {
    name: 'audience_size',
    label: 'Audience Size',
    type: 'string',
    fieldType: 'text',
    groupName: 'contactinformation',
    description: 'Expected audience size for the event',
  },
];

// ============================================================================
// DEAL PROPERTIES
// ============================================================================

const dealProperties = [
  {
    name: 'event_name',
    label: 'Event Name',
    type: 'string',
    fieldType: 'text',
    groupName: 'dealinformation',
    description: 'Name of the speaking event',
  },
  {
    name: 'event_date_deal',
    label: 'Event Date',
    type: 'date',
    fieldType: 'date',
    groupName: 'dealinformation',
    description: 'Date of the event',
  },
  {
    name: 'event_location_deal',
    label: 'Event Location',
    type: 'string',
    fieldType: 'text',
    groupName: 'dealinformation',
    description: 'Location/venue for the event',
  },
  {
    name: 'engagement_type_deal',
    label: 'Engagement Type',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'dealinformation',
    description: 'Type of speaking engagement',
    options: [
      { label: 'Podcast Guest', value: 'podcast_guest' },
      { label: 'Keynote/Stage', value: 'keynote_stage' },
      { label: 'Workshop/Training', value: 'workshop_training' },
      { label: 'Virtual Keynote', value: 'virtual_keynote' },
    ],
  },
  {
    name: 'audience_size_deal',
    label: 'Audience Size',
    type: 'string',
    fieldType: 'text',
    groupName: 'dealinformation',
    description: 'Expected audience size',
  },
  {
    name: 'coaching_package_deal',
    label: 'Coaching Package',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'dealinformation',
    description: 'Selected coaching package for the deal',
    options: [
      { label: 'Activation ($99)', value: 'activation' },
      { label: 'Starter ($2,000)', value: 'starter' },
      { label: 'Growth ($4,000)', value: 'growth' },
      { label: 'Transformation ($6,000)', value: 'transformation' },
    ],
  },
  {
    name: 'coaching_topics_deal',
    label: 'Coaching Topics',
    type: 'enumeration',
    fieldType: 'checkbox',
    groupName: 'dealinformation',
    description: 'Areas of coaching focus for this deal',
    options: [
      { label: 'HubSpot Strategy', value: 'hubspot_strategy' },
      { label: 'Video Marketing', value: 'video_marketing' },
      { label: 'Podcasting', value: 'podcasting' },
      { label: 'AI Integration', value: 'ai_integration' },
      { label: 'Personal Transformation', value: 'personal_transformation' },
      { label: 'Marketing Strategy', value: 'marketing_strategy' },
    ],
  },
  {
    name: 'coaching_hours',
    label: 'Hours Purchased',
    type: 'number',
    fieldType: 'number',
    groupName: 'dealinformation',
    description: 'Number of coaching hours purchased',
  },
  {
    name: 'sessions_completed',
    label: 'Sessions Completed',
    type: 'number',
    fieldType: 'number',
    groupName: 'dealinformation',
    description: 'Number of coaching sessions completed',
  },
];

// ============================================================================
// FORMS
// ============================================================================

const contactForm = {
  name: 'George B. Thomas - Contact Form',
  formType: 'hubspot',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  archived: false,
  fieldGroups: [
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'firstname',
          label: 'First Name',
          required: true,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'lastname',
          label: 'Last Name',
          required: true,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'email',
          label: 'Email',
          required: true,
          hidden: false,
          fieldType: 'email',
          validation: { blockedEmailDomains: [], useDefaultBlockList: false },
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'phone',
          label: 'Phone',
          required: false,
          hidden: false,
          fieldType: 'phone',
          useCountryCodeSelect: false,
          validation: { minAllowedDigits: 7, maxAllowedDigits: 20 },
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'company',
          label: 'Company',
          required: false,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'message',
          label: 'Message',
          required: false,
          hidden: false,
          fieldType: 'multi_line_text',
          dependentFields: [],
        },
      ],
    },
    // Hidden fields for API population
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'inquiry_type',
          label: 'Inquiry Type',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'how_did_you_hear_about_us_',
          label: 'How Did You Hear About Us',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
  ],
  configuration: {
    language: 'en',
    cloneable: true,
    editable: true,
    archivable: true,
    recaptchaEnabled: false,
    notifyContactOwner: false,
    notifyRecipients: [],
    createNewContactForNewEmail: true,
    prePopulateKnownValues: true,
    allowLinkToResetKnownValues: false,
    postSubmitAction: {
      type: 'thank_you',
      value: 'Thank you for reaching out! I\'ll get back to you soon.',
    },
  },
  displayOptions: {
    renderRawHtml: false,
    theme: 'default_style',
    submitButtonText: 'Send Message',
    style: {
      fontFamily: 'arial, helvetica, sans-serif',
      backgroundWidth: '100%',
      labelTextColor: '#33475b',
      labelTextSize: '13px',
      helpTextColor: '#7C98B6',
      helpTextSize: '11px',
      legalConsentTextColor: '#33475b',
      legalConsentTextSize: '14px',
      submitColor: '#E07A5F',
      submitAlignment: 'left',
      submitFontColor: '#ffffff',
      submitSize: '12px',
    },
    cssClass: 'hs-form stacked',
  },
  legalConsentOptions: { type: 'none' },
};

const bookingForm = {
  name: 'George B. Thomas - Speaking Inquiry Form',
  formType: 'hubspot',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  archived: false,
  fieldGroups: [
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'firstname',
          label: 'First Name',
          required: true,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
        {
          objectTypeId: '0-1',
          name: 'lastname',
          label: 'Last Name',
          required: true,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'email',
          label: 'Email',
          required: true,
          hidden: false,
          fieldType: 'email',
          validation: { blockedEmailDomains: [], useDefaultBlockList: false },
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'phone',
          label: 'Phone',
          required: false,
          hidden: false,
          fieldType: 'phone',
          useCountryCodeSelect: false,
          validation: { minAllowedDigits: 7, maxAllowedDigits: 20 },
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'company',
          label: 'Company / Organization',
          required: true,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    // Hidden fields populated via API
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'inquiry_type',
          label: 'Inquiry Type',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'engagement_type',
          label: 'Engagement Type',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'speaking_budget_range',
          label: 'Budget Range',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'event_date',
          label: 'Event Date',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'event_location',
          label: 'Event Location',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'audience_size',
          label: 'Audience Size',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'how_did_you_hear_about_us_',
          label: 'How Did You Hear About Us',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
  ],
  configuration: {
    language: 'en',
    cloneable: true,
    editable: true,
    archivable: true,
    recaptchaEnabled: false,
    notifyContactOwner: false,
    notifyRecipients: [],
    createNewContactForNewEmail: true,
    prePopulateKnownValues: true,
    allowLinkToResetKnownValues: false,
    postSubmitAction: {
      type: 'thank_you',
      value: 'Thank you for your speaking inquiry! I\'ll review your request and get back to you within 48 hours.',
    },
  },
  displayOptions: {
    renderRawHtml: false,
    theme: 'default_style',
    submitButtonText: 'Submit Inquiry',
    style: {
      fontFamily: 'arial, helvetica, sans-serif',
      backgroundWidth: '100%',
      labelTextColor: '#33475b',
      labelTextSize: '13px',
      helpTextColor: '#7C98B6',
      helpTextSize: '11px',
      legalConsentTextColor: '#33475b',
      legalConsentTextSize: '14px',
      submitColor: '#E07A5F',
      submitAlignment: 'left',
      submitFontColor: '#ffffff',
      submitSize: '12px',
    },
    cssClass: 'hs-form stacked',
  },
  legalConsentOptions: { type: 'none' },
};

const coachingForm = {
  name: 'George B. Thomas - Coaching Application Form',
  formType: 'hubspot',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  archived: false,
  fieldGroups: [
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'firstname',
          label: 'First Name',
          required: true,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
        {
          objectTypeId: '0-1',
          name: 'lastname',
          label: 'Last Name',
          required: true,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'email',
          label: 'Email',
          required: true,
          hidden: false,
          fieldType: 'email',
          validation: { blockedEmailDomains: [], useDefaultBlockList: false },
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'phone',
          label: 'Phone',
          required: false,
          hidden: false,
          fieldType: 'phone',
          useCountryCodeSelect: false,
          validation: { minAllowedDigits: 7, maxAllowedDigits: 20 },
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'jobtitle',
          label: 'Your Role / Title',
          required: false,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'company',
          label: 'Company',
          required: false,
          hidden: false,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    // Hidden fields populated via API
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'inquiry_type',
          label: 'Inquiry Type',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'coaching_package',
          label: 'Coaching Package',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'coaching_topics',
          label: 'Coaching Topics',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'preferred_meeting_time',
          label: 'Preferred Meeting Time',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
    {
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'how_did_you_hear_about_us_',
          label: 'How Did You Hear About Us',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
          dependentFields: [],
        },
      ],
    },
  ],
  configuration: {
    language: 'en',
    cloneable: true,
    editable: true,
    archivable: true,
    recaptchaEnabled: false,
    notifyContactOwner: false,
    notifyRecipients: [],
    createNewContactForNewEmail: true,
    prePopulateKnownValues: true,
    allowLinkToResetKnownValues: false,
    postSubmitAction: {
      type: 'thank_you',
      value: 'Thank you for applying! I\'ll review your application and reach out to schedule your session.',
    },
  },
  displayOptions: {
    renderRawHtml: false,
    theme: 'default_style',
    submitButtonText: 'Submit Application',
    style: {
      fontFamily: 'arial, helvetica, sans-serif',
      backgroundWidth: '100%',
      labelTextColor: '#33475b',
      labelTextSize: '13px',
      helpTextColor: '#7C98B6',
      helpTextSize: '11px',
      legalConsentTextColor: '#33475b',
      legalConsentTextSize: '14px',
      submitColor: '#E07A5F',
      submitAlignment: 'left',
      submitFontColor: '#ffffff',
      submitSize: '12px',
    },
    cssClass: 'hs-form stacked',
  },
  legalConsentOptions: { type: 'none' },
};

// ============================================================================
// PIPELINES
// ============================================================================

const speakingPipeline = {
  label: 'Speaking Engagements',
  displayOrder: 1,
  stages: [
    { label: 'New Inquiry', displayOrder: 0, metadata: { probability: '0.1' } },
    { label: 'Qualification Call', displayOrder: 1, metadata: { probability: '0.2' } },
    { label: 'Proposal Sent', displayOrder: 2, metadata: { probability: '0.4' } },
    { label: 'Negotiation', displayOrder: 3, metadata: { probability: '0.6' } },
    { label: 'Contract Sent', displayOrder: 4, metadata: { probability: '0.8' } },
    { label: 'Booked', displayOrder: 5, metadata: { probability: '0.9' } },
    { label: 'Completed', displayOrder: 6, metadata: { probability: '1.0', isClosed: 'true' } },
    { label: 'Lost', displayOrder: 7, metadata: { probability: '0.0', isClosed: 'true' } },
  ],
};

const coachingPipeline = {
  label: 'Coaching Sales',
  displayOrder: 2,
  stages: [
    { label: 'Application Received', displayOrder: 0, metadata: { probability: '0.1' } },
    { label: 'Activation Scheduled', displayOrder: 1, metadata: { probability: '0.3' } },
    { label: 'Activation Completed', displayOrder: 2, metadata: { probability: '0.5' } },
    { label: 'Package Selected', displayOrder: 3, metadata: { probability: '0.7' } },
    { label: 'Payment Pending', displayOrder: 4, metadata: { probability: '0.9' } },
    { label: 'Active Client', displayOrder: 5, metadata: { probability: '1.0' } },
    { label: 'Completed', displayOrder: 6, metadata: { probability: '1.0', isClosed: 'true' } },
    { label: 'Did Not Proceed', displayOrder: 7, metadata: { probability: '0.0', isClosed: 'true' } },
  ],
};

// ============================================================================
// API HELPER FUNCTIONS
// ============================================================================

async function createProperty(objectType: string, property: any): Promise<{ success: boolean; name: string; error?: string }> {
  const url = `${BASE_URL}/crm/v3/properties/${objectType}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(property),
    });

    if (response.ok) {
      return { success: true, name: property.name };
    }

    const errorData = await response.json();

    // Property already exists - that's okay
    if (errorData.category === 'VALIDATION_ERROR' && errorData.message?.includes('already exists')) {
      return { success: true, name: property.name, error: 'Already exists (skipped)' };
    }

    return {
      success: false,
      name: property.name,
      error: errorData.message || `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      success: false,
      name: property.name,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function createPipeline(objectType: string, pipeline: any): Promise<{ success: boolean; label: string; id?: string; error?: string }> {
  const url = `${BASE_URL}/crm/v3/pipelines/${objectType}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(pipeline),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, label: pipeline.label, id: data.id };
    }

    const errorData = await response.json();

    // Pipeline with same name might exist
    if (errorData.message?.includes('already exists') || errorData.message?.includes('duplicate')) {
      return { success: true, label: pipeline.label, error: 'Already exists (skipped)' };
    }

    return {
      success: false,
      label: pipeline.label,
      error: errorData.message || `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      success: false,
      label: pipeline.label,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function checkExistingPipelines(): Promise<string[]> {
  const url = `${BASE_URL}/crm/v3/pipelines/deals`;

  try {
    const response = await fetch(url, { headers });
    if (response.ok) {
      const data = await response.json();
      return data.results?.map((p: any) => p.label) || [];
    }
  } catch (error) {
    // Ignore errors
  }
  return [];
}

async function createForm(form: any): Promise<{ success: boolean; name: string; id?: string; error?: string }> {
  const url = `${BASE_URL}/marketing/v3/forms/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, name: form.name, id: data.id };
    }

    const errorText = await response.text();
    let errorData: any;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }

    // Debug output
    console.error(`\n    DEBUG: ${form.name} response status: ${response.status}`);
    console.error(`    DEBUG: Response: ${JSON.stringify(errorData, null, 2).substring(0, 500)}`);

    // Form with same name might exist
    if (errorData.message?.includes('already exists') || errorData.message?.includes('duplicate')) {
      return { success: true, name: form.name, error: 'Already exists (skipped)' };
    }

    return {
      success: false,
      name: form.name,
      error: errorData.message || `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      success: false,
      name: form.name,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function checkExistingForms(): Promise<string[]> {
  const url = `${BASE_URL}/marketing/v3/forms/`;

  try {
    const response = await fetch(url, { headers });
    if (response.ok) {
      const data = await response.json();
      return data.results?.map((f: any) => f.name) || [];
    }
  } catch (error) {
    // Ignore errors
  }
  return [];
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('\n🚀 HubSpot Phase 1 Setup Script');
  console.log('================================\n');

  // Step 1: Create Contact Properties
  console.log('📋 Creating Contact Properties...\n');

  for (const property of contactProperties) {
    const result = await createProperty('contacts', property);
    if (result.success) {
      if (result.error) {
        console.log(`  ⏭️  ${property.label} (${property.name}): ${result.error}`);
      } else {
        console.log(`  ✅ ${property.label} (${property.name})`);
      }
    } else {
      console.log(`  ❌ ${property.label} (${property.name}): ${result.error}`);
    }
  }

  // Step 2: Create Deal Properties
  console.log('\n📋 Creating Deal Properties...\n');

  for (const property of dealProperties) {
    const result = await createProperty('deals', property);
    if (result.success) {
      if (result.error) {
        console.log(`  ⏭️  ${property.label} (${property.name}): ${result.error}`);
      } else {
        console.log(`  ✅ ${property.label} (${property.name})`);
      }
    } else {
      console.log(`  ❌ ${property.label} (${property.name}): ${result.error}`);
    }
  }

  // Step 3: Check existing pipelines
  console.log('\n🔍 Checking existing pipelines...\n');
  const existingPipelines = await checkExistingPipelines();

  // Step 4: Create Speaking Engagements Pipeline
  console.log('🔄 Creating Speaking Engagements Pipeline...\n');

  if (existingPipelines.includes(speakingPipeline.label)) {
    console.log(`  ⏭️  ${speakingPipeline.label}: Already exists (skipped)`);
  } else {
    const speakingResult = await createPipeline('deals', speakingPipeline);
    if (speakingResult.success) {
      if (speakingResult.error) {
        console.log(`  ⏭️  ${speakingPipeline.label}: ${speakingResult.error}`);
      } else {
        console.log(`  ✅ ${speakingPipeline.label} (ID: ${speakingResult.id})`);
        console.log('     Stages:');
        speakingPipeline.stages.forEach(s => console.log(`       - ${s.label}`));
      }
    } else {
      console.log(`  ❌ ${speakingPipeline.label}: ${speakingResult.error}`);
    }
  }

  // Step 5: Create Coaching Sales Pipeline
  console.log('\n🔄 Creating Coaching Sales Pipeline...\n');

  if (existingPipelines.includes(coachingPipeline.label)) {
    console.log(`  ⏭️  ${coachingPipeline.label}: Already exists (skipped)`);
  } else {
    const coachingResult = await createPipeline('deals', coachingPipeline);
    if (coachingResult.success) {
      if (coachingResult.error) {
        console.log(`  ⏭️  ${coachingPipeline.label}: ${coachingResult.error}`);
      } else {
        console.log(`  ✅ ${coachingPipeline.label} (ID: ${coachingResult.id})`);
        console.log('     Stages:');
        coachingPipeline.stages.forEach(s => console.log(`       - ${s.label}`));
      }
    } else {
      console.log(`  ❌ ${coachingPipeline.label}: ${coachingResult.error}`);
    }
  }

  // Step 6: Check existing forms
  console.log('\n🔍 Checking existing forms...\n');
  const existingForms = await checkExistingForms();

  // Step 7: Create Forms
  console.log('📝 Creating HubSpot Forms...\n');

  const forms = [
    { form: contactForm, name: 'Contact Form' },
    { form: bookingForm, name: 'Speaking Inquiry Form' },
    { form: coachingForm, name: 'Coaching Application Form' },
  ];

  for (const { form, name } of forms) {
    if (existingForms.includes(form.name)) {
      console.log(`  ⏭️  ${name}: Already exists (skipped)`);
    } else {
      const result = await createForm(form);
      if (result.success) {
        if (result.error) {
          console.log(`  ⏭️  ${name}: ${result.error}`);
        } else {
          console.log(`  ✅ ${name} (ID: ${result.id})`);
        }
      } else {
        console.log(`  ❌ ${name}: ${result.error}`);
      }
    }
  }

  // Summary
  console.log('\n================================');
  console.log('✨ Phase 1 Setup Complete!\n');
  console.log('Created:');
  console.log('  • 10 Contact Properties');
  console.log('  • 9 Deal Properties');
  console.log('  • 2 Deal Pipelines (Speaking Engagements, Coaching Sales)');
  console.log('  • 3 HubSpot Forms (Contact, Speaking, Coaching)');
  console.log('\nNext Steps:');
  console.log('  1. Verify properties in HubSpot: Settings → Properties');
  console.log('  2. Verify pipelines in HubSpot: Settings → Objects → Deals → Pipelines');
  console.log('  3. Verify forms in HubSpot: Marketing → Forms');
  console.log('  4. Run Phase 2 to create workflows and email templates\n');
}

main().catch(console.error);
