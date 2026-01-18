'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'
import { deepExpertise, broadCompetencies, principles } from '@/data/expertise'

// Additional principles only used on expertise page
const additionalPrinciples = [
  {
    title: 'Human Powered',
    description: `You're at the center of every decision, interaction, and outcome.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    title: 'Expert in Helping',
    description: (
      <>
        You'll tap into the <a href="https://superhumanframework.com/" target="_blank" rel="noopener noreferrer" className="text-link">Superhuman Framework</a>, coaching, and transformation-focused guidance.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

// Combine shared principles with expertise-specific ones
const allPrinciples = [...principles, ...additionalPrinciples]

export default function ExpertisePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero page-hero--expertise">
          <div className="container page-hero__grid">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">T-Shaped Business Owner</span>
              <h1 className="page-hero__title">
                Where Deep Expertise Meets
                <span className="page-hero__title-accent">Broad Vision</span>
              </h1>
              <p className="page-hero__description">
                When you work with George, you're getting something rare: <strong>eight pillars of deep expertise</strong> combined
                with exceptional breadth, all focused on one purpose:
                <em> helping you transform.</em>
              </p>
            </AnimatedSection>

            <AnimatedSection className="page-hero__image-wrapper" animation="slide-right">
              <div className="page-hero__image-frame" aria-hidden="true"></div>
              <div className="page-hero__image-accent" aria-hidden="true"></div>
              <div className="page-hero__image-container">
                <Image
                  src="/images/george-expertise.jpg"
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

        {/* Expertise Visual */}
        <section className="section expertise-visual">
          <div className="container">
            <AnimatedSection className="expertise-wheel" animation="scale">
              <div className="expertise-wheel__center">
                <span className="expertise-wheel__center-label">Human Transformation</span>
              </div>
              <div className="expertise-wheel__items expertise-wheel__items--single-row">
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
                      <rect x="9" y="9" width="6" height="6"/>
                      <line x1="9" y1="1" x2="9" y2="4"/>
                      <line x1="15" y1="1" x2="15" y2="4"/>
                    </svg>
                  </span>
                  <span className="expertise-wheel__label">AI</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </span>
                  <span className="expertise-wheel__label">HubSpot</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"/>
                      <line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                  </span>
                  <span className="expertise-wheel__label">Marketing</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </span>
                  <span className="expertise-wheel__label">Video</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    </svg>
                  </span>
                  <span className="expertise-wheel__label">Podcasting</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </span>
                  <span className="expertise-wheel__label">Growth</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    </svg>
                  </span>
                  <span className="expertise-wheel__label">Leadership</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </span>
                  <span className="expertise-wheel__label">Spiritual</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Deep Expertise Section */}
        <section className="section section--warm expertise-deep">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">What You'll Gain Access To</span>
              <h2 className="section-header__title">Eight Pillars of Mastery</h2>
              <p className="section-header__description">
                Each pillar represents years of dedicated practice, continuous learning,
                and real-world application, so you don't have to figure it out alone.
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

        {/* Broad Competencies Section */}
        <section className="section expertise-broad">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">More Ways You'll Benefit</span>
              <h2 className="section-header__title">The Crossbar of Knowledge</h2>
              <p className="section-header__description">
                You'll also tap into advanced competencies across
                the full spectrum of modern marketing and business.
              </p>
            </AnimatedSection>

            <StaggerContainer className="competencies-grid">
              {broadCompetencies.map((competency) => (
                <div key={competency.area} className="competency-card">
                  <div className="competency-card__header">
                    <h3 className="competency-card__title">{competency.area}</h3>
                    <span className={`competency-card__level competency-card__level--${competency.level.toLowerCase()}`}>
                      {competency.level}
                    </span>
                  </div>
                  <p className="competency-card__evidence">{competency.evidence}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Principles Section */}
        <section className="section section--dark expertise-principles">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">What You Can Expect</span>
              <h2 className="section-header__title">The Philosophy Behind Every Interaction</h2>
            </AnimatedSection>

            <StaggerContainer className="principles-grid">
              {allPrinciples.map((principle) => (
                <div key={principle.title} className="principle-card">
                  <div className="principle-card__icon">{principle.icon}</div>
                  <h3 className="principle-card__title">{principle.title}</h3>
                  <p className="principle-card__description">{principle.description}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* The Story Section */}
        <section className="section">
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
                <span className="story-card__label">The Transformation Story</span>
                <h2 className="story-card__title">From High School Dropout<br />to Industry Expert</h2>
                <div className="story-card__content">
                  <p>
                    At 17, a teacher told George he'd never amount to anything. That moment became
                    the catalyst for an extraordinary transformation.
                  </p>
                  <p>
                    Today, with 30+ years of experience, 400+ podcast episodes, and 16+ million words
                    of content, George exemplifies the transformation he helps others achieve.
                  </p>
                  <blockquote className="story-card__quote">
                    "I'm not here to be the hero of your story. I'm here to be the sidekick
                    that helps you become the superhuman you were meant to be."
                  </blockquote>
                  <Link href="/about" className="btn btn--secondary story-card__cta">
                    Read the Full Story
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section--warm">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Ready to Transform?</h2>
              <p className="cta-block__description">
                Whether you need a keynote that inspires, coaching that transforms, or
                expertise that accelerates, let's start a conversation.
              </p>
              <div className="cta-block__buttons">
                <Link href="/speaking" className="btn btn--primary btn--large">
                  Ignite Your Event
                </Link>
                <Link href="/coaching" className="btn btn--secondary btn--large">
                  Start Your Transformation
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
