'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'
import { TestimonialSection } from '@/components/TestimonialSection'
import { realTestimonials } from '@/components/TestimonialSlider'

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section - Warm Background */}
        <section className="page-hero">
          <div className="container page-hero__grid">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">Growth & Success Stories</span>
              <h1 className="page-hero__title">
                What Humans Say
                <span className="page-hero__title-accent"> About Working Together</span>
              </h1>
              <p className="page-hero__description">
                Don&apos;t just take my word for it—here&apos;s what clients like you have experienced.
                These aren&apos;t just testimonials; they&apos;re real stories of transformation from
                people who&apos;ve walked the path you&apos;re considering.
              </p>
            </AnimatedSection>

            <AnimatedSection className="page-hero__image-wrapper" animation="slide-right">
              <div className="page-hero__image-frame" aria-hidden="true"></div>
              <div className="page-hero__image-accent" aria-hidden="true"></div>
              <div className="page-hero__image-container">
                <Image
                  src="/images/george-speaking.jpg"
                  alt="George B. Thomas Speaking"
                  width={500}
                  height={600}
                  priority
                  className="page-hero__image"
                />
              </div>
            </AnimatedSection>
          </div>
          <div className="page-hero__shape" aria-hidden="true"></div>
        </section>

        {/* Testimonial Slider - Dark Blue with Animated Background */}
        <TestimonialSection
          title="What You Can Expect"
          subtitle="Voices Like Yours"
        />

        {/* Stats Section - Warm Background (contrast with dark above) */}
        <section className="section section--warm testimonials-stats">
          <div className="container">
            <StaggerContainer className="stats-row">
              <div className="stat-item">
                <span className="stat-item__value">100s</span>
                <span className="stat-item__label">Clients Helped</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__value">30+</span>
                <span className="stat-item__label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__value">12+</span>
                <span className="stat-item__label">Years HubSpot</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__value">5.0</span>
                <span className="stat-item__label">Client Rating</span>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Featured Testimonials Grid - White Background */}
        <section className="section">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Stories Like Yours</span>
              <h2 className="section-header__title">You&apos;re Not Alone on This Journey</h2>
              <p className="section-header__description">
                These are just a few success stories from people who were once where you are now.
                They took the leap—and here&apos;s what happened.
              </p>
            </AnimatedSection>

            <div className="testimonials-grid">
              {realTestimonials.map((testimonial, index) => (
                <AnimatedSection
                  key={testimonial.name}
                  className="testimonial-card"
                  animation="fade-in"
                >
                  <div className="testimonial-card__quote-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                  </div>

                  <blockquote className="testimonial-card__quote">
                    {testimonial.quote}
                  </blockquote>

                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="testimonial-card__avatar-image"
                        />
                      ) : (
                        <div className="testimonial-card__avatar-placeholder">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div className="testimonial-card__author-info">
                      <span className="testimonial-card__name">{testimonial.name}</span>
                      <span className="testimonial-card__title">
                        {testimonial.title}
                        {testimonial.company && `, ${testimonial.company}`}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* What Clients Say Section - Warm Background */}
        <section className="section section--warm">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">What You&apos;ll Experience</span>
              <h2 className="section-header__title">Here&apos;s What Keeps Coming Up</h2>
            </AnimatedSection>

            <StaggerContainer className="themes-grid">
              <div className="theme-card">
                <div className="theme-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="theme-card__title">You&apos;ll Get<br />Results</h3>
                <p className="theme-card__description">
                  You won&apos;t be stuck in planning mode. You&apos;ll see real progress—often
                  in weeks rather than months—because that&apos;s how we roll.
                </p>
              </div>

              <div className="theme-card">
                <div className="theme-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <h3 className="theme-card__title">You&apos;ll Feel<br />Genuinely Supported</h3>
                <p className="theme-card__description">
                  This isn&apos;t transactional. You&apos;ll feel the passion and care in every
                  interaction—whether on stage or one-on-one.
                </p>
              </div>

              <div className="theme-card">
                <div className="theme-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </div>
                <h3 className="theme-card__title">You&apos;ll Get<br />Real Expertise</h3>
                <p className="theme-card__description">
                  You&apos;ll work with someone who knows HubSpot inside and out—and can translate
                  that into practical strategies that actually move your business forward.
                </p>
              </div>

              <div className="theme-card">
                <div className="theme-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h3 className="theme-card__title">You&apos;ll Catch<br />the Energy</h3>
                <p className="theme-card__description">
                  Clients call it &quot;FIRE&quot;—that positive energy that&apos;s contagious.
                  You&apos;ll leave every interaction feeling inspired and ready to take action.
                </p>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section - Dark Background */}
        <section className="section section--dark testimonials-cta">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Ready to Write Your Own Success Story?</h2>
              <p className="cta-block__description">
                You&apos;ve seen what&apos;s possible. You&apos;ve heard from people who were once where you are.
                Now it&apos;s your turn—let&apos;s start a conversation about your transformation.
              </p>
              <div className="cta-block__buttons">
                <Link href="/coaching/apply" className="btn btn--primary btn--large">
                  Start Your Transformation
                </Link>
                <Link href="/contact" className="btn btn--outline-light btn--large">
                  Let&apos;s Talk
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
