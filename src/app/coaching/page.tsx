'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'
import { TestimonialSection } from '@/components/TestimonialSection'
import { deepExpertise } from '@/data/expertise'

const pricingPlans = [
  {
    name: 'Starter',
    hours: 10,
    price: 2000,
    pricePerHour: 200,
    slug: 'starter',
    description: 'Perfect if you\'re ready to tackle a focused project or test the waters with coaching.',
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
    price: 4000,
    pricePerHour: 200,
    slug: 'growth',
    description: 'Ideal if you\'re ready for comprehensive transformation and sustained momentum.',
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
    price: 6000,
    pricePerHour: 200,
    slug: 'transformation',
    description: 'For when you\'re ready to go all-in on deep, sustained transformation and mastery.',
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

const coachingApproach = [
  {
    title: 'Sidekick Mentality',
    description: 'I\'m not here to be the hero—I\'m here to help you become one. Your success is my success.',
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
    title: 'Real World Focus',
    description: 'No fluff or theory for theory\'s sake. Everything we do applies directly to your goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Authentic Connection',
    description: 'Let\'s embrace the messy. Real growth happens when you show up as yourself.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Human First Tech',
    description: 'You\'ll learn how technology and AI can amplify your connections, never replace them.',
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
  },
  {
    title: 'Celebration Culture',
    description: 'We\'ll celebrate every win, big or small. Your progress deserves recognition.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Continuous Growth',
    description: 'You\'ll benefit from fresh insights I bring from my own ongoing learning journey.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
]

const process = [
  {
    step: 1,
    title: 'Activation Meeting',
    subtitle: '$99 for 45 minutes',
    description: 'We\'ll start with a focused session to understand your goals, challenges, and create your transformation roadmap.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="22" y1="12" x2="18" y2="12"/>
        <line x1="6" y1="12" x2="2" y2="12"/>
        <line x1="12" y1="6" x2="12" y2="2"/>
        <line x1="12" y1="22" x2="12" y2="18"/>
      </svg>
    ),
  },
  {
    step: 2,
    title: 'Custom Plan',
    subtitle: 'Tailored to You',
    description: 'You\'ll receive a coaching plan designed around your specific objectives, timeline, and growth areas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    step: 3,
    title: 'Transform Together',
    subtitle: 'Regular Sessions',
    description: 'You\'ll work through regular 1:1 sessions, applying frameworks and strategies that move you toward your goals.',
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
    step: 4,
    title: 'Measure & Iterate',
    subtitle: 'Track Progress',
    description: 'You\'ll track your progress, celebrate your wins along the way, and we\'ll refine our approach to maximize your growth.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
]

const faqs = [
  {
    question: 'How are coaching sessions conducted?',
    answer: 'Sessions are conducted via video call (Zoom) and are typically 60 minutes each. We can adjust session length based on your needs and schedule.',
  },
  {
    question: 'How quickly can I use my coaching hours?',
    answer: 'Your coaching hours are valid for 12 months from purchase. Most clients complete their hours within 3 to 6 months, but we\'ll work at a pace that suits your schedule.',
  },
  {
    question: 'Can I mix topics within my coaching package?',
    answer: 'Absolutely! Your coaching is fully customized. We can focus on one area or blend multiple topics based on what\'ll help you most.',
  },
  {
    question: 'Do you offer team or group coaching?',
    answer: 'Yes! For team coaching, workshops, or training programs, reach out directly and we\'ll discuss custom solutions for your organization.',
  },
  {
    question: 'What\'s the refund policy?',
    answer: 'If after our first session you feel this isn\'t the right fit, I\'ll refund your remaining unused hours—no questions asked. Your transformation matters most.',
  },
]

// FAQ Accordion Component
function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section">
      <div className="container container--narrow">
        <AnimatedSection className="section-header" animation="fade-in">
          <span className="section-header__subtitle">You&apos;re Wondering</span>
          <h2 className="section-header__title">Common Questions</h2>
        </AnimatedSection>

        <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={`faq-accordion__item ${openIndex === index ? 'faq-accordion__item--open' : ''}`}
            >
              <button
                className="faq-accordion__trigger"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="faq-accordion__question">{faq.question}</span>
                <span className="faq-accordion__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" className="faq-accordion__icon-vertical" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div
                className="faq-accordion__content"
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                hidden={openIndex !== index}
              >
                <div className="faq-accordion__content-inner">
                  <p className="faq-accordion__answer">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CoachingPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero page-hero--coaching">
          <div className="container page-hero__grid">
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
                <Link href="/coaching/apply?type=activation" className="btn btn--primary">
                  Start Your Transformation
                </Link>
                <a href="#packages" className="btn btn--secondary">
                  Explore Your Options
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection className="page-hero__image-wrapper page-hero__image-wrapper--coaching" animation="slide-right">
              <div className="page-hero__image-frame" aria-hidden="true"></div>
              <div className="page-hero__image-accent" aria-hidden="true"></div>
              <div className="page-hero__image-container">
                <Image
                  src="/images/george-coaching.jpg"
                  alt="George B. Thomas Coaching"
                  width={683}
                  height={483}
                  priority
                  className="page-hero__image"
                />
              </div>
            </AnimatedSection>
          </div>
          <div className="page-hero__shape" aria-hidden="true"></div>
        </section>

        {/* Topics Section - Using expertise-stem-card style */}
        <section id="topics" className="section section--warm">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">What You&apos;ll Master</span>
              <h2 className="section-header__title">Areas of Deep Expertise</h2>
              <p className="section-header__description">
                Choose your focus area or combine multiple topics for a comprehensive
                coaching experience tailored to your unique needs.
              </p>
            </AnimatedSection>

            <div className="expertise-stems">
              {deepExpertise.map((expertise) => (
                <AnimatedSection
                  key={expertise.area}
                  className="expertise-stem-card"
                  animation="fade-in"
                >
                  <div className="expertise-stem-card__header">
                    <div className="expertise-stem-card__icon">{expertise.icon}</div>
                    <div>
                      <h3 className="expertise-stem-card__title">{expertise.area}</h3>
                      <span className="expertise-stem-card__level">{expertise.level}</span>
                    </div>
                  </div>

                  <div className="expertise-stem-card__stats">
                    {expertise.stats.map((stat) => (
                      <div key={stat.label} className="expertise-stem-card__stat">
                        <span className="expertise-stem-card__stat-value">{stat.value}</span>
                        <span className="expertise-stem-card__stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="expertise-stem-card__description">{expertise.description}</p>

                  <ul className="expertise-stem-card__highlights">
                    {expertise.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  {expertise.links && expertise.links.length > 0 && (
                    <div className="expertise-stem-card__links">
                      {expertise.links.map((link) => (
                        link.external ? (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="expertise-stem-card__link"
                          >
                            {link.label} →
                          </a>
                        ) : (
                          <Link
                            key={link.label}
                            href={link.url}
                            className="expertise-stem-card__link"
                          >
                            {link.label} →
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="section section--dark">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">What You Can Expect</span>
              <h2 className="section-header__title">The Sidekick Approach</h2>
            </AnimatedSection>

            <StaggerContainer className="approach-grid">
              {coachingApproach.map((item) => (
                <div key={item.title} className="approach-card">
                  <div className="approach-card__icon">{item.icon}</div>
                  <h3 className="approach-card__title">{item.title}</h3>
                  <p className="approach-card__description">{item.description}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Process Section - Creative Timeline */}
        <section className="section">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Your Path Forward</span>
              <h2 className="section-header__title">How It Works</h2>
              <p className="section-header__description">
                A simple, transparent process designed to get you results.
              </p>
            </AnimatedSection>

            <div className="journey-timeline">
              {/* Animated connecting path */}
              <div className="journey-timeline__path" aria-hidden="true">
                <div className="journey-timeline__path-line"></div>
                <div className="journey-timeline__path-glow"></div>
                <div className="journey-timeline__traveler"></div>
              </div>

              <div className="journey-timeline__steps">
                {process.map((item, index) => (
                  <AnimatedSection
                    key={item.step}
                    className="journey-step"
                    animation="fade-in"
                  >
                    {/* Step indicator with pulse */}
                    <div className="journey-step__indicator">
                      <div className="journey-step__pulse" aria-hidden="true"></div>
                      <div className="journey-step__number">{item.step}</div>
                    </div>

                    {/* Connector arrow (not on last item) */}
                    {index < process.length - 1 && (
                      <div className="journey-step__connector" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}

                    {/* Card content */}
                    <div className="journey-step__card">
                      <div className="journey-step__icon">{item.icon}</div>
                      <div className="journey-step__badge">{item.subtitle}</div>
                      <h3 className="journey-step__title">{item.title}</h3>
                      <p className="journey-step__description">{item.description}</p>

                      {/* Micro action indicator */}
                      <div className="journey-step__action">
                        <span className="journey-step__action-dot"></span>
                        <span className="journey-step__action-text">
                          {index === 0 && 'Book your session'}
                          {index === 1 && 'Receive your roadmap'}
                          {index === 2 && 'Start transforming'}
                          {index === 3 && 'Celebrate wins'}
                        </span>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="packages" className="section section--warm">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Your Investment</span>
              <h2 className="section-header__title">Choose Your Path</h2>
              <p className="section-header__description">
                All packages are billed at <strong>$200 per hour</strong>—transparent pricing
                with no hidden fees. Pick the package that fits your transformation goals.
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

                  <Link
                    href={`/coaching/apply?package=${plan.slug}`}
                    className={`btn ${plan.popular ? 'btn--primary' : 'btn--secondary'} pricing-card__cta`}
                  >
                    Begin Your Journey
                  </Link>
                </div>
              ))}
            </StaggerContainer>

            <AnimatedSection className="activation-meeting-section" animation="fade-in">
              <div className="activation-meeting">
                <div className="activation-meeting__content">
                  <h3 className="activation-meeting__title">Not sure where to start?</h3>
                  <p className="activation-meeting__description">
                    Book an <strong>Activation Meeting</strong>—a focused 45-minute session where we&apos;ll
                    map out your goals, identify your biggest opportunities, and create a clear path forward.
                  </p>
                </div>
                <div className="activation-meeting__pricing">
                  <span className="activation-meeting__price">$99</span>
                  <span className="activation-meeting__label">45 minute session</span>
                </div>
                <Link href="/coaching/apply?type=activation" className="btn btn--outline-light btn--large btn--arrow">
                  Get Clarity Now
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Story Section */}
        <section className="section coaching-story">
          <div className="container container--narrow">
            <AnimatedSection animation="fade-in">
              <div className="story-card">
                <div className="story-card__image-wrapper">
                  <Image
                    src="/images/george-highschool.webp"
                    alt="George B. Thomas in High School"
                    width={180}
                    height={180}
                    className="story-card__image"
                  />
                </div>
                <span className="story-card__label">Why I Coach</span>
                <h2 className="story-card__title">From &quot;You Will Never Amount to Anything&quot;<br />to Helping Others Transform</h2>
                <div className="story-card__content">
                  <p>
                    At 17, a teacher told me I&apos;d never amount to anything. That moment became
                    the catalyst for my own transformation—and now my life&apos;s mission.
                  </p>
                  <p>
                    I&apos;ve been where you might be: uncertain, stuck, or just knowing there&apos;s
                    more inside you waiting to come out. That&apos;s exactly why I coach.
                  </p>
                  <blockquote className="story-card__quote">
                    &quot;I&apos;m not here to be the hero of your story. I&apos;m here to be the sidekick
                    that helps you become the superhuman you were meant to be.&quot;
                  </blockquote>
                  <Link href="/about" className="btn btn--secondary story-card__cta">
                    Discover My Journey
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonial Slider Section */}
        <TestimonialSection />

        {/* FAQ Section */}
        <FAQSection faqs={faqs} />

        {/* Final CTA */}
        <section className="section section--warm">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Ready to Become Your Best Self?</h2>
              <p className="cta-block__description">
                Your journey to becoming the superhuman you were meant to be starts with a single conversation.
              </p>
              <div className="cta-block__buttons">
                <Link href="/coaching/apply?type=activation" className="btn btn--primary btn--large">
                  Start Your Transformation
                </Link>
                <Link href="/expertise" className="btn btn--secondary btn--large">
                  Explore What You&apos;ll Master
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
