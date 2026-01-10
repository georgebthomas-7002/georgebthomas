'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'
import { realTestimonials } from '@/components/TestimonialSlider'

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="page-hero page-hero--testimonials">
          <div className="container page-hero__grid">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">Client Success Stories</span>
              <h1 className="page-hero__title">
                Real Results From
                <span className="page-hero__title-accent">Real People</span>
              </h1>
              <p className="page-hero__description">
                Don&apos;t just take my word for it. Here&apos;s what clients, collaborators, and
                industry peers have to say about working together. Every testimonial represents
                a real transformation and genuine partnership.
              </p>
            </AnimatedSection>

            <AnimatedSection className="page-hero__image-wrapper page-hero__image-wrapper--testimonials" animation="slide-right">
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

        {/* Stats Section */}
        <section className="section section--compact testimonials-stats">
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

        {/* Featured Testimonials */}
        <section className="section section--warm testimonials-featured">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Featured Stories</span>
              <h2 className="section-header__title">Transformations That Speak Volumes</h2>
              <p className="section-header__description">
                These are just a few of the many success stories from people who have
                partnered with me on their journey to becoming superhuman.
              </p>
            </AnimatedSection>

            <div className="testimonials-grid">
              {realTestimonials.map((testimonial, index) => (
                <AnimatedSection
                  key={testimonial.name}
                  className={`testimonial-card ${index < 2 ? 'testimonial-card--featured' : ''}`}
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

        {/* What Clients Say Section */}
        <section className="section testimonials-themes">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Common Themes</span>
              <h2 className="section-header__title">What Clients Consistently Say</h2>
            </AnimatedSection>

            <StaggerContainer className="themes-grid">
              <div className="theme-card">
                <div className="theme-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="theme-card__title">Gets Things Done</h3>
                <p className="theme-card__description">
                  Clients consistently mention that George delivers on promises and makes
                  more progress in weeks than others do in months.
                </p>
              </div>

              <div className="theme-card">
                <div className="theme-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <h3 className="theme-card__title">Genuine Care</h3>
                <p className="theme-card__description">
                  A passion for helping others shines through in every interaction, whether
                  on stage or in a one-on-one coaching call.
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
                <h3 className="theme-card__title">Technical Expertise</h3>
                <p className="theme-card__description">
                  Deep HubSpot knowledge combined with practical marketing insights
                  that translate into real business results.
                </p>
              </div>

              <div className="theme-card">
                <div className="theme-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h3 className="theme-card__title">Energy & Enthusiasm</h3>
                <p className="theme-card__description">
                  Described as &quot;FIRE&quot; and a &quot;force of positive energy,&quot;
                  George brings contagious enthusiasm to every engagement.
                </p>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section--dark testimonials-cta">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Ready to Write Your Success Story?</h2>
              <p className="cta-block__description">
                Join the hundreds of clients who have transformed their businesses and lives.
                Let&apos;s start a conversation about your journey.
              </p>
              <div className="cta-block__buttons">
                <Link href="/coaching/apply" className="btn btn--primary btn--large">
                  Apply for Coaching
                </Link>
                <Link href="/contact" className="btn btn--secondary btn--large">
                  Get in Touch
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
