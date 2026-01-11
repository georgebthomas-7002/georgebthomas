'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/AnimatedSection'

// Engagement types
const engagementTypes = [
  {
    id: 'podcast',
    title: 'Podcast Guest Appearance',
    description: 'Join your show to share insights and stories',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
  {
    id: 'keynote',
    title: 'Event Stage / Keynote',
    description: 'In-person presentations that inspire action',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    id: 'workshop',
    title: 'Corporate Workshop / Training',
    description: 'Interactive sessions for teams',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'virtual',
    title: 'Virtual Keynote / Webinar',
    description: 'Engaging online presentations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
]

// Topics of interest
const hubspotTopics = [
  'HubSpot Strategy',
  'Inbound Marketing',
  'Sales Enablement',
  'RevOps',
  'CRM Implementation',
]

const mindsetTopics = [
  'Growth Mindset',
  'Leadership',
  'Change Management',
  'Team Development',
]

// Budget ranges
const budgetRanges = [
  { value: '', label: 'Select budget range (optional)' },
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-20k', label: '$10,000 - $20,000' },
  { value: '20k-plus', label: '$20,000+' },
  { value: 'discuss', label: 'Let\'s Discuss' },
]

// How did you hear options
const howHeardOptions = [
  { value: '', label: 'Select an option...' },
  { value: 'podcast', label: 'Podcast (HubHeroes or guest appearance)' },
  { value: 'hubspot', label: 'HubSpot Community' },
  { value: 'inbound', label: 'INBOUND Conference' },
  { value: 'social', label: 'Social Media' },
  { value: 'referral', label: 'Referral / Word of Mouth' },
  { value: 'search', label: 'Google Search' },
  { value: 'other', label: 'Other' },
]

type BookingFormData = {
  // Contact info
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  // Event details
  engagementType: string
  eventName: string
  eventDate: string
  eventLocation: string
  audienceSize: string
  // Topics
  topicsOfInterest: string[]
  // Additional
  budgetRange: string
  eventDetails: string
  howHeard: string
}

export default function BookPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    engagementType: '',
    eventName: '',
    eventDate: '',
    eventLocation: '',
    audienceSize: '',
    topicsOfInterest: [],
    budgetRange: '',
    eventDetails: '',
    howHeard: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTopicToggle = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topicsOfInterest: prev.topicsOfInterest.includes(topic)
        ? prev.topicsOfInterest.filter(t => t !== topic)
        : [...prev.topicsOfInterest, topic],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'booking',
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit booking inquiry')
      }

      setIsComplete(true)
    } catch {
      setError('Something went wrong. Please try again or email george@georgebthomas.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.engagementType &&
      formData.eventDetails
    )
  }

  // Success state
  if (isComplete) {
    return (
      <>
        <Header />
        <main id="main-content">
          <section className="page-hero page-hero--compact">
            <div className="container">
              <AnimatedSection className="apply-complete" animation="fade-in">
                <div className="apply-complete__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h1 className="apply-complete__title">Inquiry Received!</h1>
                <p className="apply-complete__description">
                  Thank you for your interest in booking George. I&apos;ll review your inquiry and get back to you within 24-48 hours to discuss the details.
                </p>
                <div className="apply-complete__actions">
                  <Link href="/speaking" className="btn btn--primary">
                    Explore Speaking Topics
                  </Link>
                  <Link href="/" className="btn btn--secondary">
                    Back to Home
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  // Form rendering
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-hero page-hero--compact">
          <div className="container">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">Book George</span>
              <h1 className="page-hero__title">Bring Transformation to Your Event</h1>
              <p className="page-hero__description">
                From keynotes to podcasts, workshops to virtual events—let&apos;s
                create an experience your audience won&apos;t forget.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section apply-form-section">
          <div className="container container--narrow">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Engagement Type */}
              <div className="apply-step">
                <h2 className="apply-step__title">What Type of Engagement? *</h2>
                <p className="apply-step__description">
                  Select the format that best fits your needs
                </p>
                <div className="apply-packages">
                  {engagementTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`apply-package ${formData.engagementType === type.id ? 'apply-package--selected' : ''}`}
                      onClick={() => handleInputChange('engagementType', type.id)}
                    >
                      <div className="apply-package__header">
                        <div className="apply-topic__icon">{type.icon}</div>
                        <h3>{type.title}</h3>
                      </div>
                      <p>{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Event Details */}
              <div className="apply-step">
                <h2 className="apply-step__title">Event Details</h2>
                <p className="apply-step__description">
                  Tell me about your event (fill in what you know)
                </p>
                <div className="apply-form">
                  <div className="apply-form__row">
                    <div className="apply-field">
                      <label htmlFor="eventName">Event Name</label>
                      <input
                        type="text"
                        id="eventName"
                        value={formData.eventName}
                        onChange={(e) => handleInputChange('eventName', e.target.value)}
                        placeholder="e.g., Annual Marketing Summit 2025"
                      />
                    </div>
                    <div className="apply-field">
                      <label htmlFor="eventDate">Event Date</label>
                      <input
                        type="date"
                        id="eventDate"
                        value={formData.eventDate}
                        onChange={(e) => handleInputChange('eventDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="apply-form__row">
                    <div className="apply-field">
                      <label htmlFor="eventLocation">Location</label>
                      <input
                        type="text"
                        id="eventLocation"
                        value={formData.eventLocation}
                        onChange={(e) => handleInputChange('eventLocation', e.target.value)}
                        placeholder="City, State or 'Virtual'"
                      />
                    </div>
                    <div className="apply-field">
                      <label htmlFor="audienceSize">Expected Audience Size</label>
                      <input
                        type="text"
                        id="audienceSize"
                        value={formData.audienceSize}
                        onChange={(e) => handleInputChange('audienceSize', e.target.value)}
                        placeholder="e.g., 200-500 attendees"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Topics of Interest */}
              <div className="apply-step">
                <h2 className="apply-step__title">Topics of Interest</h2>
                <p className="apply-step__description">
                  Select all topics that might be relevant (optional)
                </p>

                <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--color-accent)', fontFamily: 'var(--font-family-heading)' }}>
                  HubSpot & Marketing
                </h4>
                <div className="apply-topics">
                  {hubspotTopics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className={`apply-topic ${formData.topicsOfInterest.includes(topic) ? 'apply-topic--selected' : ''}`}
                      onClick={() => handleTopicToggle(topic)}
                    >
                      <span className="apply-topic__title">{topic}</span>
                      {formData.topicsOfInterest.includes(topic) && (
                        <span className="apply-topic__check">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <h4 style={{ margin: 'var(--space-xl) 0 var(--space-md)', color: 'var(--color-accent)', fontFamily: 'var(--font-family-heading)' }}>
                  Mindset & Leadership
                </h4>
                <div className="apply-topics">
                  {mindsetTopics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className={`apply-topic ${formData.topicsOfInterest.includes(topic) ? 'apply-topic--selected' : ''}`}
                      onClick={() => handleTopicToggle(topic)}
                    >
                      <span className="apply-topic__title">{topic}</span>
                      {formData.topicsOfInterest.includes(topic) && (
                        <span className="apply-topic__check">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Additional Details */}
              <div className="apply-step">
                <h2 className="apply-step__title">Tell Me More</h2>
                <div className="apply-form">
                  <div className="apply-field">
                    <label htmlFor="budgetRange">Budget Range (optional)</label>
                    <select
                      id="budgetRange"
                      value={formData.budgetRange}
                      onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                    >
                      {budgetRanges.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="apply-field">
                    <label htmlFor="eventDetails">
                      Tell me about your event and what you&apos;re looking for *
                    </label>
                    <textarea
                      id="eventDetails"
                      value={formData.eventDetails}
                      onChange={(e) => handleInputChange('eventDetails', e.target.value)}
                      placeholder="Share details about your event, audience, goals, and any specific topics or outcomes you're hoping for..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="apply-field">
                    <label htmlFor="howHeard">How did you hear about George?</label>
                    <select
                      id="howHeard"
                      value={formData.howHeard}
                      onChange={(e) => handleInputChange('howHeard', e.target.value)}
                    >
                      {howHeardOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 5: Contact Information */}
              <div className="apply-step">
                <h2 className="apply-step__title">Your Contact Information</h2>
                <div className="apply-form">
                  <div className="apply-form__row">
                    <div className="apply-field">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="apply-field">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="apply-field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="apply-form__row">
                    <div className="apply-field">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="apply-field">
                      <label htmlFor="company">Company / Organization</label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p style={{ color: 'var(--color-accent)', textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <div className="apply-nav">
                <button
                  type="submit"
                  className="btn btn--primary btn--large"
                  disabled={!canSubmit() || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
