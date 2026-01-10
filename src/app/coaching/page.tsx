'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'

const coachingTopics = [
  {
    title: 'HubSpot Strategy & Implementation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    description: 'Master the HubSpot ecosystem with personalized guidance from someone with 42+ certifications and 12+ years of hands-on experience.',
    areas: [
      'Platform setup and optimization',
      'Marketing automation workflows',
      'Sales hub configuration',
      'Reporting and analytics',
      'Integration strategy',
    ],
  },
  {
    title: 'Video Marketing Mastery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    description: 'Learn the "Video Jedi" approach to creating authentic, effective video content that connects with your audience.',
    areas: [
      'Video strategy development',
      'Content creation frameworks',
      'Camera confidence coaching',
      'YouTube optimization',
      'Sales video techniques',
    ],
  },
  {
    title: 'Podcasting Excellence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    description: 'Launch, grow, or optimize your podcast with guidance from someone with 400+ episodes across multiple successful shows.',
    areas: [
      'Podcast launch strategy',
      'Audience growth tactics',
      'Interview techniques',
      'Monetization models',
      'Production workflows',
    ],
  },
  {
    title: 'AI Integration & Strategy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/>
        <line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/>
        <line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/>
        <line x1="20" y1="14" x2="23" y2="14"/>
        <line x1="1" y1="9" x2="4" y2="9"/>
        <line x1="1" y1="14" x2="4" y2="14"/>
      </svg>
    ),
    description: 'Navigate the AI landscape with a human-first approach that amplifies your team without losing authentic connection.',
    areas: [
      'AI tool selection',
      'Implementation strategy',
      'Team training programs',
      'Ethical AI practices',
      'Automation optimization',
    ],
  },
  {
    title: 'Personal Transformation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    description: 'The Superhuman Framework applied to your personal and professional growth—become the best version of yourself.',
    areas: [
      'Purpose and vision clarity',
      'Limiting belief breakthrough',
      'High-performance habits',
      'Career transitions',
      'Leadership development',
    ],
  },
  {
    title: 'Marketing & Content Strategy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    description: 'Build a content engine that drives sustainable growth—with 30+ years of marketing experience guiding your strategy.',
    areas: [
      'Content strategy development',
      'Inbound marketing planning',
      'Brand positioning',
      'Marketing team optimization',
      'ROI measurement',
    ],
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    hours: 10,
    price: 1500,
    pricePerHour: 150,
    description: 'Perfect for focused projects or getting started with coaching.',
    features: [
      '10 hours of 1:1 coaching',
      'Flexible scheduling',
      'Email support between sessions',
      'Session recordings available',
      'Resource recommendations',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    hours: 20,
    price: 3000,
    pricePerHour: 150,
    description: 'Ideal for comprehensive transformation and ongoing development.',
    features: [
      '20 hours of 1:1 coaching',
      'Priority scheduling',
      'Email and Slack support',
      'Session recordings available',
      'Custom resource library',
      'Monthly progress reviews',
    ],
    popular: true,
  },
  {
    name: 'Transformation',
    hours: 30,
    price: 4500,
    pricePerHour: 150,
    description: 'For deep, sustained transformation and mastery-level development.',
    features: [
      '30 hours of 1:1 coaching',
      'VIP scheduling access',
      'Unlimited email and Slack support',
      'Session recordings available',
      'Custom resource library',
      'Weekly progress check-ins',
      'Bonus: 1 keynote consultation',
    ],
    popular: false,
  },
]

const process = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We start with a free 30-minute call to understand your goals, challenges, and whether we\'re the right fit.',
  },
  {
    step: 2,
    title: 'Custom Plan',
    description: 'Based on our discovery, I\'ll create a tailored coaching plan focused on your specific objectives.',
  },
  {
    step: 3,
    title: 'Transform Together',
    description: 'We work together through regular sessions, applying frameworks and strategies to achieve your goals.',
  },
  {
    step: 4,
    title: 'Measure & Iterate',
    description: 'We track progress, celebrate wins, and adjust our approach to ensure you\'re getting maximum value.',
  },
]

export default function CoachingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="page-hero page-hero--coaching">
          <div className="container">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">Your Sidekick in Transformation</span>
              <h1 className="page-hero__title">
                Coaching That Creates
                <span className="page-hero__title-accent"> Real Results</span>
              </h1>
              <p className="page-hero__description">
                I&apos;m not here to be the hero of your story—I&apos;m here to be the sidekick
                that helps you become the superhuman you were meant to be. With over 30 years
                of experience and a genuine passion for helping humans grow, let&apos;s
                unlock your next level together.
              </p>
              <div className="page-hero__cta-group">
                <a href="#pricing" className="btn btn--primary btn--large">
                  View Coaching Packages
                </a>
                <a href="#topics" className="btn btn--secondary btn--large">
                  Explore Topics
                </a>
              </div>
            </AnimatedSection>
          </div>
          <div className="page-hero__shape" aria-hidden="true"></div>
        </section>

        {/* Topics Section */}
        <section id="topics" className="section coaching-topics">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Coaching Topics</span>
              <h2 className="section-header__title">Areas of Expertise</h2>
              <p className="section-header__description">
                Choose your focus area—or combine multiple topics for a comprehensive
                coaching experience tailored to your unique needs.
              </p>
            </AnimatedSection>

            <StaggerContainer className="topics-grid">
              {coachingTopics.map((topic) => (
                <div key={topic.title} className="topic-card">
                  <div className="topic-card__icon">{topic.icon}</div>
                  <h3 className="topic-card__title">{topic.title}</h3>
                  <p className="topic-card__description">{topic.description}</p>
                  <ul className="topic-card__areas">
                    {topic.areas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Process Section */}
        <section className="section section--warm coaching-process">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">How It Works</span>
              <h2 className="section-header__title">The Coaching Journey</h2>
            </AnimatedSection>

            <StaggerContainer className="process-steps">
              {process.map((item) => (
                <div key={item.step} className="process-step">
                  <div className="process-step__number">{item.step}</div>
                  <h3 className="process-step__title">{item.title}</h3>
                  <p className="process-step__description">{item.description}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section coaching-pricing">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Investment</span>
              <h2 className="section-header__title">Coaching Packages</h2>
              <p className="section-header__description">
                All packages are billed at <strong>$150 per hour</strong>—transparent pricing
                with no hidden fees. Choose the package that fits your transformation goals.
              </p>
            </AnimatedSection>

            <StaggerContainer className="pricing-grid">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}
                >
                  {plan.popular && (
                    <span className="pricing-card__badge">Most Popular</span>
                  )}

                  <h3 className="pricing-card__name">{plan.name}</h3>
                  <div className="pricing-card__hours">{plan.hours} Hours</div>

                  <div className="pricing-card__price">
                    <span className="pricing-card__currency">$</span>
                    <span className="pricing-card__amount">{plan.price.toLocaleString()}</span>
                  </div>
                  <p className="pricing-card__rate">${plan.pricePerHour}/hour</p>

                  <p className="pricing-card__description">{plan.description}</p>

                  <ul className="pricing-card__features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="mailto:george@georgebthomas.com?subject=Coaching%20Inquiry%20-%20"
                    className={`btn ${plan.popular ? 'btn--primary' : 'btn--secondary'} pricing-card__cta`}
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </StaggerContainer>

            <AnimatedSection className="pricing-note" animation="fade-in">
              <p>
                <strong>Not sure which package is right for you?</strong> Let&apos;s chat.
                Book a free 30-minute discovery call to discuss your goals and find the
                perfect fit for your transformation journey.
              </p>
              <a href="mailto:george@georgebthomas.com?subject=Discovery%20Call%20Request" className="btn btn--secondary">
                Book a Free Discovery Call
              </a>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="section section--dark coaching-testimonial">
          <div className="container container--narrow">
            <AnimatedSection className="testimonial-featured" animation="fade-in">
              <div className="testimonial-featured__quote-mark">&quot;</div>
              <blockquote className="testimonial-featured__quote">
                George has an incredible ability to take complex concepts and make them
                accessible. His coaching helped me not just understand what to do, but
                why it matters—and that&apos;s transformed how I approach everything.
              </blockquote>
              <div className="testimonial-featured__attribution">
                <span className="testimonial-featured__name">Client Success Story</span>
                <span className="testimonial-featured__role">Business Owner</span>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section coaching-faq">
          <div className="container container--narrow">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Questions</span>
              <h2 className="section-header__title">Frequently Asked</h2>
            </AnimatedSection>

            <div className="faq-list">
              <div className="faq-item">
                <h3 className="faq-item__question">How are coaching sessions conducted?</h3>
                <p className="faq-item__answer">
                  Sessions are conducted via video call (Zoom) and are typically 60 minutes each.
                  We can adjust session length based on your needs and schedule.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-item__question">How quickly can I use my coaching hours?</h3>
                <p className="faq-item__answer">
                  Coaching hours are valid for 12 months from purchase. Most clients complete
                  their hours within 3-6 months, but we&apos;ll work at a pace that suits your schedule.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-item__question">Can I mix topics within my coaching package?</h3>
                <p className="faq-item__answer">
                  Absolutely! Your coaching is fully customized. We can focus on one area or
                  blend multiple topics based on what will help you most.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-item__question">Do you offer team or group coaching?</h3>
                <p className="faq-item__answer">
                  Yes! For team coaching, workshops, or training programs, please reach out
                  directly to discuss custom solutions for your organization.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-item__question">What&apos;s the refund policy?</h3>
                <p className="faq-item__answer">
                  If after our first session you feel this isn&apos;t the right fit, I&apos;ll refund
                  your remaining unused hours—no questions asked. Your transformation matters most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section section--warm coaching-final-cta">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Ready to Transform?</h2>
              <p className="cta-block__description">
                Your journey to becoming the best version of yourself starts with a single conversation.
              </p>
              <div className="cta-block__buttons">
                <a href="mailto:george@georgebthomas.com?subject=Let's%20Work%20Together" className="btn btn--primary btn--large">
                  Start the Conversation
                </a>
                <Link href="/expertise" className="btn btn--secondary btn--large">
                  Learn About My Expertise
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
