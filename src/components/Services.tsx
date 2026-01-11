'use client'

import { AnimatedSection, StaggerContainer } from './AnimatedSection'

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    title: 'Keynote Speaking',
    description: 'Energize your audience with powerful keynotes that inspire action, challenge perspectives, and deliver lasting impact. Perfect for conferences, corporate events, and industry gatherings.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Executive Coaching',
    description: 'One-on-one coaching designed to unlock your leadership potential. Together, we\'ll identify barriers, develop strategies, and create a personalized roadmap to your success.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    title: 'Workshops & Training',
    description: 'Interactive workshops that transform teams. From leadership development to communication skills, these sessions create real-world skills your team can apply immediately.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
    ),
    title: 'Podcast Appearances',
    description: 'Looking for a guest who brings energy, expertise, and engaging stories? I\'ve appeared on 100+ podcasts discussing leadership, growth, HubSpot, and the superhuman framework.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'HubSpot Consulting',
    description: 'With 12+ years of HubSpot expertise, I help businesses maximize their investment in the platform. From strategy to implementation, let\'s unlock your growth potential.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'The Superhuman Framework',
    description: 'My signature methodology for personal and professional transformation. Discover how to operate at your highest level and achieve what others think is impossible.',
  },
]

export function Services() {
  return (
    <section id="speaking" className="services section">
      <div className="container">
        <AnimatedSection className="services__header" animation="fade-in">
          <span className="services__subtitle">How I Can Help</span>
          <h2 className="services__title">Services That Drive Results</h2>
          <p className="services__description">
            Whether you're looking to inspire your team, develop your leadership skills,
            or transform your organization, I offer tailored solutions to meet your unique needs.
          </p>
        </AnimatedSection>

        <StaggerContainer className="services__grid">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <div className="service-card__icon">{service.icon}</div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
