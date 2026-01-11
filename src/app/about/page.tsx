'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'

// Timeline chapters for the story - compact, wider layout
const storyChapters = [
  {
    year: '1989',
    title: 'The Words That Changed Everything',
    content: `At 17, a math teacher looked me in the eye and said, "You'll never amount to anything." Six months later, I dropped out and joined the United States Navy. Those words haunted me for years. Today, I'm grateful for them—they lit a fire that's never gone out.`,
    image: '/images/george-football.jpg',
    imageAlt: 'George B. Thomas in high school',
    hasImage: true,
  },
  {
    year: '2007',
    title: 'When Are You Gonna Realize?',
    content: `During a mission trip to Montana, Prophetess Juanita pulled me aside and asked, "When are you gonna realize you're the blessing?" That question shifted everything. I stopped seeking blessings and started becoming one.`,
    image: '/images/crow-indian-reservation-land.webp',
    imageAlt: 'Crow Indian Reservation, Montana',
    hasImage: true,
  },
  {
    year: '2010',
    title: 'The Blue Windbreaker Interview',
    content: `I showed up to an agency interview wearing a blue windbreaker with no portfolio. Asked if I knew InDesign, I said, "No. But I can learn it." That weekend: four Lynda.com certifications. Monday, my supervisor smiled: "See? Told you."`,
    image: '/images/george-early-career.jpg',
    imageAlt: 'George B. Thomas early career',
    hasImage: true,
  },
  {
    year: '2012',
    title: 'The HubSpot Awakening',
    content: `Walking into INBOUND Boston changed my trajectory forever. I watched Gary Vee perform, absorbed the human-centric marketing philosophy, and realized: "I want to be a marketer when I grow up." I dove into HubSpot Academy and haven't looked back since.`,
    image: '/images/george-inbound-2012.jpg',
    imageAlt: 'George at INBOUND 2012',
    hasImage: true,
  },
  {
    year: '2013',
    title: 'Joining The Sales Lion',
    content: `Marcus Sheridan invited me to join The Sales Lion. I told my wife, "I honestly feel like I just won the marketing lottery." This was the beginning of a transformative journey that would shape everything about who I am as a marketer, speaker, and human.`,
    image: '/images/the-sales-lion.webp',
    imageAlt: 'The Sales Lion logo',
    hasImage: true,
  },
  {
    year: '2017',
    title: 'Finding My Voice',
    content: `When Marcus asked me to start a podcast, I said, "There's absolutely no way I'm gonna do that." 271 episodes of The Hubcast later, I found my voice. My first keynote about being a high school dropout taught me the magic of vulnerability.`,
    image: '/images/george-wild-inbound.webp',
    imageAlt: 'George speaking at INBOUND',
    hasImage: true,
  },
  {
    year: '2022',
    title: 'Sidekick Strategies is Born',
    content: `I swore I'd never create an agency. But the HubSpot community had other plans. One day I realized I had three contractors working with me weekly. Sidekick Strategies was born—built on a radical idea: family comes first.`,
    image: null,
    imageAlt: '',
    hasImage: false,
    imagePlaceholder: 'Sidekick Team Photo Coming Soon',
    url: 'https://sidekickstrategies.com/',
    external: true,
  },
  {
    year: '2023',
    title: 'The Superhuman Framework',
    content: `Through years of learning, failing, and growing, I developed a framework for living and leading with purpose. Four cornerstones—Love, Purpose, Passion, and Persistence—and ten pillars that help humans flourish without sacrificing their soul.`,
    image: '/images/george-expertise.jpg',
    imageAlt: 'George B. Thomas speaking',
    hasImage: true,
    cornerstones: ['Love', 'Purpose', 'Passion', 'Persistence'],
    url: 'https://superhumanframework.com/',
    external: true,
  },
  {
    year: '2025',
    title: 'The Spiritual Side of Leadership',
    content: `Despite outward success—40+ certifications, speaking at INBOUND annually since 2015, a thriving agency—something was calling. What began as a personal wisdom practice evolved into a platform that helps leaders integrate faith with work.`,
    image: null,
    imageAlt: '',
    hasImage: false,
    imagePlaceholder: 'SSOL Launch Photo Coming Soon',
    url: 'https://www.spiritualsideofleadership.com/',
    external: true,
  },
  {
    year: 'Today',
    title: 'The FEAM & Beyond',
    content: `Sidekick Strategies is powered by "the FEAM"—a blend of family and team where family always comes first. 124+ certifications, 2000+ educational videos. As my wife jokes, "You don't have clients, you have friends."`,
    image: '/images/george-family.jpg',
    imageAlt: 'The Thomas Family',
    hasImage: true,
  },
]

const credentials = [
  { value: '40+', label: 'HubSpot Certifications' },
  { value: '30+', label: 'Years Experience' },
  { value: '2000+', label: 'Videos & Podcasts' },
  { value: '12+', label: 'Years HubSpot' },
]

const values = [
  {
    title: 'Humans First',
    description: 'Your connections matter. Technology should amplify them, never replace them.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Sidekick Mentality',
    description: `You're the hero. I'm here to help you succeed.`,
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
    title: 'Faith-Driven',
    description: `Your success shouldn't cost your soul. Lead with purpose.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Lifelong Learner',
    description: 'Your willingness to grow matters more than what you already know.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section - Tighter */}
        <section className="page-hero page-hero--compact">
          <div className="container page-hero__grid">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">Father. Husband. Marketer. Believer.</span>
              <h1 className="page-hero__title">
                My Name is
                <span className="page-hero__title-accent"> George B. Thomas</span>
              </h1>
              <p className="page-hero__description">
                I believe journeys matter. Through understanding and connection,
                you'll unlock your potential and become the superhuman you were meant to be.
              </p>
              <div className="page-hero__cta-group">
                <Link href="/coaching" className="btn btn--primary">
                  Start Your Transformation
                </Link>
                <a href="#story" className="btn btn--secondary">
                  Discover the Journey
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection className="page-hero__image-wrapper" animation="slide-right">
              <div className="page-hero__image-frame" aria-hidden="true"></div>
              <div className="page-hero__image-accent" aria-hidden="true"></div>
              <div className="page-hero__image-container">
                <Image
                  src="/images/george-headshot.jpg"
                  alt="George B. Thomas"
                  width={500}
                  height={500}
                  priority
                  className="page-hero__image"
                />
              </div>
            </AnimatedSection>
          </div>
          <div className="page-hero__shape" aria-hidden="true"></div>
        </section>

        {/* Stats Section - Tighter */}
        <section className="section section--tight">
          <div className="container">
            <StaggerContainer className="stats-row">
              {credentials.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-item__value">{stat.value}</span>
                  <span className="stat-item__label">{stat.label}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Story Timeline Section - Wide Layout */}
        <section id="story" className="section section--tight">
          <div className="container container--wide">
            <AnimatedSection className="section-header section-header--tight" animation="fade-in">
              <span className="section-header__subtitle">The Journey</span>
              <h2 className="section-header__title">From Dropout to Difference-Maker</h2>
            </AnimatedSection>

            <div className="story-timeline story-timeline--wide">
              {storyChapters.map((chapter, index) => (
                <AnimatedSection
                  key={chapter.year}
                  className="story-chapter-wide"
                  animation="fade-in"
                >
                  <div className="story-chapter-wide__year-badge">
                    <span>{chapter.year}</span>
                  </div>

                  <div className="story-chapter-wide__card">
                    <div className="story-chapter-wide__content">
                      <h3 className="story-chapter-wide__title">
                        {chapter.url ? (
                          <a
                            href={chapter.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link"
                          >
                            {chapter.title}
                          </a>
                        ) : (
                          chapter.title
                        )}
                      </h3>
                      <p className="story-chapter-wide__text">{chapter.content}</p>
                      {chapter.cornerstones && (
                        <div className="story-chapter-wide__cornerstones">
                          {chapter.cornerstones.map((c) => (
                            <span key={c} className="cornerstone cornerstone--sm">{c}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="story-chapter-wide__media">
                      {chapter.hasImage && chapter.image ? (
                        <Image
                          src={chapter.image}
                          alt={chapter.imageAlt}
                          width={200}
                          height={150}
                          className="story-chapter-wide__image"
                        />
                      ) : (
                        <div className="story-chapter-wide__placeholder">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                          <span>{chapter.imagePlaceholder || 'Photo Coming Soon'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section - Compact */}
        <section className="section section--tight section--warm">
          <div className="container">
            <AnimatedSection className="section-header section-header--tight" animation="fade-in">
              <span className="section-header__subtitle">What This Means For You</span>
              <h2 className="section-header__title">Values That Guide Your Experience</h2>
            </AnimatedSection>

            <StaggerContainer className="values-grid values-grid--compact">
              {values.map((value) => (
                <div key={value.title} className="value-card value-card--compact">
                  <div className="value-card__icon">{value.icon}</div>
                  <h3 className="value-card__title">{value.title}</h3>
                  <p className="value-card__description">{value.description}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section--tight">
          <div className="container">
            <AnimatedSection className="cta-block cta-block--compact" animation="fade-in">
              <h2 className="cta-block__title">Ready to Start Your Journey?</h2>
              <p className="cta-block__description">
                Whether you need help with HubSpot, want coaching to reach your next level,
                or need a speaker who'll connect with your audience—I'm here to be your sidekick.
              </p>
              <div className="cta-block__buttons">
                <Link href="/coaching/apply" className="btn btn--primary btn--large">
                  Begin Your Transformation
                </Link>
                <Link href="/speaking" className="btn btn--secondary btn--large">
                  Ignite Your Event
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
