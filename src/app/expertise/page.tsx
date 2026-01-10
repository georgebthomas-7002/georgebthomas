'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'

const deepExpertise = [
  {
    area: 'HubSpot Mastery',
    level: 'World-Class',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    stats: [
      { value: '42+', label: 'Certifications' },
      { value: '12+', label: 'Years Experience' },
      { value: '2015', label: 'INBOUND Speaker Since' },
    ],
    highlights: [
      'HubSpot Certified Trainer',
      'Created first HubSpot-specific podcast (The Hubcast)',
      'INBOUND speaker every year since 2015',
      'Worked at 3 major HubSpot partner agencies',
      'Likely the most certified individual globally',
    ],
    description: 'George isn\'t just certified—he\'s been shaping the HubSpot conversation for over a decade. His deep understanding of the platform spans marketing, sales, service, and operations hubs.',
  },
  {
    area: 'Video Marketing',
    level: 'World-Class',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    stats: [
      { value: '1000s', label: 'Videos Created' },
      { value: '400+', label: 'HubSpot Tutorials' },
      { value: '3x', label: 'Vidyard Keynotes' },
    ],
    highlights: [
      'Known as the "Video Jedi"',
      'Keynote speaker at Vidyard Fast Forward 3 consecutive years',
      'Pioneered personalized sales video approach',
      'Philosophy: "Embrace the messy"—authenticity over perfection',
    ],
    description: 'George bridges video production craft with marketing strategy at the enterprise level. His "Video Jedi" approach emphasizes authentic connection over polished perfection.',
  },
  {
    area: 'Podcasting',
    level: 'World-Class',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    stats: [
      { value: '400+', label: 'Episodes Hosted' },
      { value: '13+', label: 'Years Podcasting' },
      { value: '50+', label: 'Guest Appearances' },
    ],
    highlights: [
      'Host of Hub Heroes & Beyond Your Default',
      'Co-host of Marketing Smarts (MarketingProfs)',
      'Created The Hubcast (271 episodes, first HubSpot podcast)',
      'Guest on 50+ industry podcasts',
    ],
    description: 'One of the longest-tenured podcasters in the marketing technology space, George has built audiences, sparked conversations, and created community through audio for over a decade.',
  },
]

const broadCompetencies = [
  {
    area: 'Speaking & Training',
    level: 'Expert',
    evidence: 'INBOUND speaker since 2015, Social Media Marketing World emcee, All American Speakers bureau',
  },
  {
    area: 'AI & Technology',
    level: 'Advanced',
    evidence: 'Created AI clone on Delphi.ai, trains on AI integration, writing "Cloning Human Expertise" book',
  },
  {
    area: 'Inbound Marketing',
    level: 'Expert',
    evidence: '30+ years marketing experience, authored thought leadership for MarketingProfs',
  },
  {
    area: 'Sales Enablement',
    level: 'Advanced',
    evidence: 'Created Superhuman Marketing OS, trains on sales video, RevOps experience',
  },
  {
    area: 'Content Strategy',
    level: 'Expert',
    evidence: '16+ million words of content created across multiple platforms',
  },
  {
    area: 'Business Coaching',
    level: 'Advanced',
    evidence: 'Sidekick Strategies owner, Superhuman Framework creator, transition specialist',
  },
]

const principles = [
  {
    title: 'Value-First',
    description: 'Free content, educational focus, leading with help before asking for anything in return.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Human-First',
    description: 'AI augments humans, technology serves connection, authenticity over polish.',
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
    title: 'Content-Driven',
    description: 'Authority built through consistent creation across podcasts, videos, and articles.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    title: 'Expert in Helping Humans',
    description: 'Superhuman Framework, coaching, and transformation focus in all content.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

export default function ExpertisePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="page-hero page-hero--expertise">
          <div className="container">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">Y-Shaped Business Owner</span>
              <h1 className="page-hero__title">
                Where Deep Expertise
                <span className="page-hero__title-accent"> Meets Broad Vision</span>
              </h1>
              <p className="page-hero__description">
                Most marketers develop expertise in one area while maintaining broad knowledge across the discipline.
                George has done something rare: he&apos;s developed <strong>three stems of deep expertise</strong> while
                maintaining exceptional breadth—creating a Y-shape that converges at one purpose:
                <em> helping humans transform.</em>
              </p>
            </AnimatedSection>
          </div>
          <div className="page-hero__shape" aria-hidden="true"></div>
        </section>

        {/* Y-Shape Visual */}
        <section className="section expertise-visual">
          <div className="container">
            <AnimatedSection className="y-shape-diagram" animation="scale">
              <div className="y-shape-diagram__arms">
                <div className="y-shape-diagram__arm y-shape-diagram__arm--left">
                  <span className="y-shape-diagram__label">Technology</span>
                  <span className="y-shape-diagram__sublabel">HubSpot Ecosystem</span>
                </div>
                <div className="y-shape-diagram__arm y-shape-diagram__arm--right">
                  <span className="y-shape-diagram__label">Content Creation</span>
                  <span className="y-shape-diagram__sublabel">Video & Podcasting</span>
                </div>
              </div>
              <div className="y-shape-diagram__stem">
                <div className="y-shape-diagram__convergence">
                  <span className="y-shape-diagram__convergence-label">Human Transformation</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Deep Expertise Section */}
        <section className="section section--warm expertise-deep">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Deep Expertise</span>
              <h2 className="section-header__title">Three Stems of Mastery</h2>
              <p className="section-header__description">
                Each area represents over a decade of dedicated practice, continuous learning,
                and real-world application at the highest levels.
              </p>
            </AnimatedSection>

            <div className="expertise-stems">
              {deepExpertise.map((expertise, index) => (
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
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Broad Competencies Section */}
        <section className="section expertise-broad">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Broad Competencies</span>
              <h2 className="section-header__title">The Crossbar of Knowledge</h2>
              <p className="section-header__description">
                Beyond deep expertise, George maintains advanced competencies across
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
              <span className="section-header__subtitle">Core Philosophy</span>
              <h2 className="section-header__title">What Guides Every Interaction</h2>
            </AnimatedSection>

            <StaggerContainer className="principles-grid">
              {principles.map((principle) => (
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
        <section className="section expertise-story">
          <div className="container container--narrow">
            <AnimatedSection animation="fade-in">
              <div className="story-card">
                <span className="story-card__label">The Transformation Story</span>
                <h2 className="story-card__title">From High School Dropout to Industry Expert</h2>
                <div className="story-card__content">
                  <p>
                    George&apos;s journey isn&apos;t typical. At 17, he dropped out of high school after a
                    teacher told him he&apos;d &quot;never amount to anything.&quot; That moment could have defined
                    his limits—instead, it became the catalyst for transformation.
                  </p>
                  <p>
                    Today, with 30+ years of marketing experience, 400+ podcast episodes, thousands of
                    videos, and 16+ million words of content, George exemplifies the very transformation
                    he helps others achieve. His story isn&apos;t just inspiring—it&apos;s proof that anyone
                    can become the best version of themselves.
                  </p>
                  <blockquote className="story-card__quote">
                    &quot;I&apos;m not here to be the hero of your story. I&apos;m here to be the sidekick
                    that helps you become the superhuman you were meant to be.&quot;
                  </blockquote>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section--warm expertise-cta">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Ready to Transform?</h2>
              <p className="cta-block__description">
                Whether you need a keynote that inspires, coaching that transforms, or
                expertise that accelerates—let&apos;s start a conversation.
              </p>
              <div className="cta-block__buttons">
                <Link href="/speaking" className="btn btn--primary btn--large">
                  Explore Speaking Topics
                </Link>
                <Link href="/coaching" className="btn btn--secondary btn--large">
                  Work With George
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
