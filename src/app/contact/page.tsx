'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/AnimatedSection'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
          formType: 'contact',
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsComplete(true)
    } catch {
      setError('Something went wrong. Please try again or email george@georgebthomas.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = () => {
    return formData.firstName && formData.lastName && formData.email && formData.message
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
                <h1 className="apply-complete__title">Message Sent!</h1>
                <p className="apply-complete__description">
                  Thank you for reaching out! I&apos;ll review your message and get back to you as soon as possible—usually within 24-48 hours.
                </p>
                <Link href="/" className="btn btn--primary">
                  Back to Home
                </Link>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  // Form state
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-hero page-hero--compact">
          <div className="container">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">Get In Touch</span>
              <h1 className="page-hero__title">Let&apos;s Start a Conversation</h1>
              <p className="page-hero__description">
                Have a question or want to explore how we can work together?
                I&apos;d love to hear from you.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section apply-form-section">
          <div className="container container--narrow">
            <div className="apply-step">
              <form onSubmit={handleSubmit} className="apply-form">
                {/* Two-column row for names */}
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
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="apply-field">
                    <label htmlFor="company">Company (optional)</label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                </div>

                <div className="apply-field">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="How can I help you?"
                    rows={5}
                    required
                  />
                </div>

                {error && (
                  <p style={{ color: 'var(--color-accent)', textAlign: 'center' }}>
                    {error}
                  </p>
                )}

                <div className="apply-nav">
                  <button
                    type="submit"
                    className="btn btn--primary btn--large"
                    disabled={!canSubmit() || isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
