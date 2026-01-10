'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'

const deepExpertise = [
  {
    area: 'AI & Technology',
    level: 'Expert',
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
    stats: [
      { value: '16M+', label: 'Words Trained' },
      { value: '35+', label: 'Hours Saved Monthly' },
      { value: '24/7', label: 'AI Clone Active' },
    ],
    highlights: [
      'Created AI clone on Delphi.ai trained on 16+ million words',
      'Human-first philosophy: AI augments, never replaces',
      'Writing "Cloning Human Expertise" book',
      'Trains teams on ethical AI integration',
    ],
    description: 'George believes AI should amplify human connection, not replace it. His AI clone, trained on decades of content, extends his ability to help people 24/7 while maintaining his authentic voice and values.',
  },
  {
    area: 'HubSpot Mastery',
    level: 'World-Class',
    link: 'https://sidekickstrategies.com/',
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
      'Created first HubSpot specific podcast (The Hubcast)',
      'INBOUND speaker every year since 2015',
      'Likely the most certified individual globally',
    ],
    description: 'George isn\'t just certified, he\'s been shaping the HubSpot conversation for over a decade. His deep understanding of the platform spans marketing, sales, service, and operations hubs.',
  },
  {
    area: 'Marketing & Sales',
    level: 'Expert',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    stats: [
      { value: '30+', label: 'Years Experience' },
      { value: '16M+', label: 'Words Created' },
      { value: '1000s', label: 'Campaigns Launched' },
    ],
    highlights: [
      'Inbound marketing pioneer since the early days',
      'Created Superhuman Marketing OS framework',
      'MarketingProfs thought leader and contributor',
      'Sales enablement through video and content',
    ],
    description: 'With over three decades in marketing and sales, George brings battle-tested strategies that blend inbound methodology with authentic human connection to drive sustainable growth.',
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
      'Vidyard Fast Forward keynote speaker 3 years running',
      'Pioneered personalized sales video approach',
      'Philosophy: "Embrace the messy" because authenticity wins',
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
      'Created The Hubcast (271 episodes)',
      'Guest on 50+ industry podcasts',
    ],
    description: 'One of the longest-tenured podcasters in the marketing technology space, George has built audiences, sparked conversations, and created community through audio for over a decade.',
  },
  {
    area: 'Personal Growth',
    level: 'Expert',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    stats: [
      { value: '4', label: 'Cornerstones' },
      { value: '10', label: 'H-Pillars' },
      { value: '100s', label: 'Lives Changed' },
    ],
    highlights: [
      'Creator of the Superhuman Framework',
      'Host of "Beyond Your Default" podcast',
      'Specializes in limiting belief breakthrough',
      'From dropout to thought leader, proof it works',
    ],
    description: 'The Superhuman Framework combines four cornerstones (Love, Purpose, Passion, Persistence) and ten H-pillars to help individuals break through limiting beliefs and transform.',
  },
  {
    area: 'Leadership',
    level: 'Expert',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    stats: [
      { value: '20+', label: 'Years Leading Teams' },
      { value: '3', label: 'Agency Leadership Roles' },
      { value: '100s', label: 'People Mentored' },
    ],
    highlights: [
      'Led teams at multiple HubSpot partner agencies',
      'Sidekick Strategies founder and owner',
      'Servant leadership philosophy',
      'Develops future marketing leaders',
    ],
    description: 'George leads by serving others. His sidekick mentality means empowering team members to become heroes in their own stories while building organizations that put humans first.',
  },
  {
    area: 'Spiritual Leadership',
    level: 'Expert',
    link: 'https://www.spiritualsideofleadership.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        <path d="M2 12h20"/>
      </svg>
    ),
    stats: [
      { value: '100+', label: 'Episodes' },
      { value: '1000s', label: 'Lives Touched' },
      { value: 'Weekly', label: 'New Content' },
    ],
    highlights: [
      'Host of The Spiritual Side of Leadership podcast',
      'Faith integrated with business leadership',
      'Helping leaders find deeper purpose',
      'Building values driven organizations',
    ],
    description: 'George explores the intersection of faith and leadership, helping business leaders integrate their spiritual values with their professional lives to lead with purpose and authenticity.',
  },
]

const broadCompetencies = [
  {
    area: 'Speaking & Training',
    level: 'Expert',
    evidence: 'INBOUND speaker since 2015, Social Media Marketing World emcee, All American Speakers bureau',
  },
  {
    area: 'Inbound Marketing',
    level: 'Expert',
    evidence: '30+ years marketing experience, authored thought leadership for MarketingProfs',
  },
  {
    area: 'Sales Enablement',
    level: 'Expert',
    evidence: 'Created Superhuman Marketing OS, trains on sales video, RevOps experience',
  },
  {
    area: 'Content Strategy',
    level: 'Expert',
    evidence: '16+ million words of content created across multiple platforms',
  },
  {
    area: 'Community Building',
    level: 'Advanced',
    evidence: 'Built engaged communities across podcasts, social media, and HubSpot ecosystem',
  },
  {
    area: 'Team Development',
    level: 'Advanced',
    evidence: 'Trains and mentors marketing teams, develops internal talent at partner agencies',
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
    title: 'AI-Assisted, Human-Powered',
    description: 'Leveraging cutting edge AI tools while keeping humans at the center of every decision and interaction.',
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
              <span className="page-hero__tagline">T-Shaped Business Owner</span>
              <h1 className="page-hero__title">
                Where Deep Expertise Meets
                <span className="page-hero__title-accent">Broad Vision</span>
              </h1>
              <p className="page-hero__description">
                Most marketers develop expertise in one area while maintaining broad knowledge across the discipline.
                George has done something rare: he&apos;s developed <strong>eight pillars of deep expertise</strong> while
                maintaining exceptional breadth, all converging at one purpose:
                <em> helping humans transform.</em>
              </p>
            </AnimatedSection>
          </div>
          <div className="page-hero__shape" aria-hidden="true"></div>
        </section>

        {/* Expertise Visual */}
        <section className="section expertise-visual">
          <div className="container">
            <AnimatedSection className="expertise-wheel" animation="scale">
              <div className="expertise-wheel__items">
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__label">AI</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__label">HubSpot</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__label">Marketing</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__label">Video</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__label">Podcasting</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__label">Growth</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__label">Leadership</span>
                </div>
                <div className="expertise-wheel__item">
                  <span className="expertise-wheel__label">Spiritual</span>
                </div>
              </div>
              <div className="expertise-wheel__center">
                <span className="expertise-wheel__center-label">Human Transformation</span>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Deep Expertise Section */}
        <section className="section section--warm expertise-deep">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Deep Expertise</span>
              <h2 className="section-header__title">Eight Pillars of Mastery</h2>
              <p className="section-header__description">
                Each pillar represents years of dedicated practice, continuous learning,
                and real world application at the highest levels.
              </p>
            </AnimatedSection>

            <div className="expertise-stems">
              {deepExpertise.map((expertise) => {
                const cardContent = (
                  <>
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

                    {expertise.link && (
                      <span className="expertise-stem-card__link">
                        Learn more →
                      </span>
                    )}
                  </>
                )

                return expertise.link ? (
                  <a
                    key={expertise.area}
                    href={expertise.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="expertise-stem-card expertise-stem-card--linked"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <AnimatedSection
                    key={expertise.area}
                    className="expertise-stem-card"
                    animation="fade-in"
                  >
                    {cardContent}
                  </AnimatedSection>
                )
              })}
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
                    At 17, a teacher told George he&apos;d never amount to anything. That moment became
                    the catalyst for an extraordinary transformation.
                  </p>
                  <p>
                    Today, with 30+ years of experience, 400+ podcast episodes, and 16+ million words
                    of content, George exemplifies the transformation he helps others achieve.
                  </p>
                  <blockquote className="story-card__quote">
                    &quot;I&apos;m not here to be the hero of your story. I&apos;m here to be the sidekick
                    that helps you become the superhuman you were meant to be.&quot;
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
        <section className="section section--warm expertise-cta">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Ready to Transform?</h2>
              <p className="cta-block__description">
                Whether you need a keynote that inspires, coaching that transforms, or
                expertise that accelerates, let&apos;s start a conversation.
              </p>
              <div className="cta-block__buttons">
                <Link href="/speaking" className="btn btn--primary btn--large">
                  Explore Speaking Topics
                </Link>
                <Link href="/contact" className="btn btn--secondary btn--large">
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
