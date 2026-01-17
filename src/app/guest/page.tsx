'use client'

import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'

// Hero Data
const heroData = {
  tagline: 'Podcast Guest',
  name: 'GEORGE B. THOMAS',
  title: 'Speaker, Coach & Superhuman Framework Creator',
  badges: ['30+ Years Experience', '400+ Podcast Episodes', '42+ HubSpot Certifications'],
}

// Bio - Third-person for hosts to read verbatim
const bio = `George B. Thomas is a marketing strategist, international speaker, and creator of the Superhuman Framework who has helped thousands of businesses and leaders flourish through human-first strategies. With over 30 years of experience and 42+ HubSpot certifications, George brings a unique blend of tactical expertise and transformational storytelling to every conversation.

From high school dropout to INBOUND speaker, George's journey resonates with audiences seeking authentic growth. As host of HubHeroes and Beyond Your Default podcasts, he's conducted 400+ interviews and knows exactly how to deliver value that keeps listeners engaged.

Whether discussing marketing automation, leadership transformation, or the intersection of faith and business, George brings energy, vulnerability, and actionable insights that leave lasting impressions on audiences.`

// Interview Topics - 9 ideas for podcast hosts
const topics = [
  {
    id: 1,
    title: 'The Superhuman Framework',
    description: '4 Cornerstones and 10 Pillars for high-performance leadership, business, and life. A practical system for becoming who you were meant to be.',
  },
  {
    id: 2,
    title: 'Human-Powered, AI-Assisted',
    description: 'Using AI to amplify your potential without losing your soul. Staying authentically human in an increasingly automated world.',
  },
  {
    id: 3,
    title: 'From Dropout to Difference-Maker',
    description: 'How a teacher\'s harsh words became fuel for transformation. Turning pain into purpose and setbacks into setups.',
  },
  {
    id: 4,
    title: 'The Future of Marketing with AI',
    description: 'Practical AI applications that actually work today. Cutting through the hype to find tools that serve real connection.',
  },
  {
    id: 5,
    title: 'Faith, Work & Integration',
    description: 'Leading with purpose without sacrificing your soul. The spiritual side of leadership and building businesses that matter.',
  },
  {
    id: 6,
    title: 'Human-First Marketing',
    description: 'Why genuine connection beats automation every time. Building trust in a world obsessed with algorithms and shortcuts.',
  },
  {
    id: 7,
    title: 'HubSpot Mastery & RevOps',
    description: 'Practical insights from 12+ years and 42+ certifications. Making technology serve human connection, not replace it.',
  },
  {
    id: 8,
    title: 'Video & Podcasting Strategy',
    description: 'Building audiences through authentic content. Why messy and real beats polished and fake every single time.',
  },
  {
    id: 9,
    title: 'Leadership Transformation',
    description: 'Helping teams and individuals break through their defaults. Creating cultures where people actually flourish.',
  },
]

// Suggested Questions - Two columns of 5
const questionsLeft = [
  "A teacher told you at 17 you'd never amount to anything. How did that moment shape who you are today?",
  "On a mission trip to Montana, someone asked you, 'When are you gonna realize you're the blessing?' How did that question change your entire approach to life and service?",
  "You showed up to an interview in a blue windbreaker with no portfolio and said 'I can learn it.' What made you so confident, and how has that mindset served you since?",
  "You've said joining Marcus Sheridan at The Sales Lion felt like 'winning the marketing lottery.' What did you learn from him that still shapes how you work today?",
  "What is the Superhuman Framework, and how can listeners apply it to their own lives and businesses?",
]

const questionsRight = [
  "The Superhuman Framework has 10 Pillars of H. Which pillar do you personally struggle with most, and why is that important for listeners to hear?",
  "Your agency runs on what you call 'the FEAM,' where family always comes first. How do you actually make that work when clients have urgent needs?",
  "You've conducted over 400 podcast interviews. What's the one question you wish more hosts would ask their guests?",
  "How do you balance being a marketing expert with your deeper calling to help people flourish spiritually?",
  "What advice would you give someone who feels stuck between playing it safe and pursuing their true calling?",
]

// Credentials Strip
const credentials = [
  { value: '42+', label: 'HubSpot Certifications' },
  { value: '100+', label: 'Stages' },
  { value: '400+', label: 'Podcast Episodes' },
  { value: '30+', label: 'Years Experience' },
]

// Featured Testimonial
const testimonial = {
  quote: "George doesn't just answer questions. He tells stories that make you feel something. Our audience engagement spiked 40% on his episode. Book him.",
  name: "Podcast Host",
  role: "Marketing Podcast Network",
}

// Superhuman Framework
const cornerstones = ['Love', 'Purpose', 'Passion', 'Persistence']
const pillars = [
  'Honesty', 'Humility', 'Humor', 'Habits', 'Helpfulness',
  'Hustle', 'Health', 'Hope', 'Humanity', 'HIS Way',
]

// Podcasts George Hosts
const podcasts = [
  {
    title: 'HubHeroes',
    description: 'Weekly conversations about HubSpot, inbound marketing, and building businesses that put humans first. Real talk with real practitioners.',
    url: 'https://www.hubheroes.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: 'Beyond Your Default',
    description: 'Deep dives into personal growth, leadership transformation, and becoming the person you were meant to be. Stories of struggle and success.',
    url: 'https://www.beyondyourdefault.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16l4-4-4-4"/>
        <path d="M8 12h8"/>
      </svg>
    ),
  },
]

// Contact Info
const contactInfo = {
  email: 'george@georgebthomas.com',
  phone: '(717) 620-5, zero, nine, two',
  calendarUrl: 'https://meetings.hubspot.com/george51',
}

export default function GuestPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero page-hero--compact">
          <div className="container page-hero__grid">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">{heroData.tagline}</span>
              <h1 className="page-hero__title">
                {heroData.name}
              </h1>
              <p className="page-hero__description">
                {heroData.title}
              </p>
              <div className="pill-cluster">
                <div className="pill-cluster__items">
                  {heroData.badges.map((badge) => (
                    <div key={badge} className="pill">
                      <span className="pill__label">{badge}</span>
                    </div>
                  ))}
                </div>
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

        {/* Bio Section */}
        <section className="section section--warm">
          <div className="container container--narrow">
            <AnimatedSection animation="fade-in">
              <div className="guest-bio-wrapper">
                <div className="guest-bio-wrapper__frame" aria-hidden="true"></div>
                <div className="guest-bio-wrapper__accent guest-bio-wrapper__accent--1" aria-hidden="true"></div>
                <div className="guest-bio-wrapper__accent guest-bio-wrapper__accent--2" aria-hidden="true"></div>
                <div className="guest-bio">
                  {bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="guest-bio__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Interview Topics */}
        <section className="section">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Topics We Can Explore</span>
              <h2 className="section-header__title">Interview Topics</h2>
            </AnimatedSection>

            <StaggerContainer className="info-grid">
              {topics.map((topic) => (
                <div key={topic.id} className="info-card topic-card">
                  <span className="topic-card__number">{topic.id}</span>
                  <h3 className="info-card__title">{topic.title}</h3>
                  <p className="info-card__description">{topic.description}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Suggested Questions */}
        <section className="section section--warm">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Ready to Use</span>
              <h2 className="section-header__title">Suggested Questions</h2>
            </AnimatedSection>

            <div className="question-columns">
              <AnimatedSection animation="fade-in" className="question-column">
                <ol className="question-list" start={1}>
                  {questionsLeft.map((question, index) => (
                    <li key={index} className="question-list__item">
                      <p className="question-list__text">{question}</p>
                    </li>
                  ))}
                </ol>
              </AnimatedSection>

              <AnimatedSection animation="fade-in" className="question-column">
                <ol className="question-list" start={6}>
                  {questionsRight.map((question, index) => (
                    <li key={index} className="question-list__item">
                      <p className="question-list__text">{question}</p>
                    </li>
                  ))}
                </ol>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Credentials Strip */}
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

        {/* Featured Testimonial */}
        <section className="section section--dark">
          <div className="container">
            <AnimatedSection className="testimonial-featured" animation="fade-in">
              <div className="testimonial-featured__quote-mark">"</div>
              <p className="testimonial-featured__quote">{testimonial.quote}</p>
              <div className="testimonial-featured__attribution">
                <span className="testimonial-featured__name">{testimonial.name}</span>
                <span className="testimonial-featured__role">{testimonial.role}</span>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Superhuman Framework */}
        <section className="section">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">The Framework</span>
              <h2 className="section-header__title">The Superhuman Framework</h2>
              <p className="section-header__description">
                A practical system built on 4 Cornerstones and 10 Pillars for high-performance living.
              </p>
            </AnimatedSection>

            <StaggerContainer className="feature-grid">
              <div className="feature-card">
                <div className="feature-card__header">
                  <div className="feature-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="feature-card__title">4 Cornerstones</h3>
                    <span className="feature-card__badge">Foundation</span>
                  </div>
                </div>
                <p className="feature-card__description">
                  The foundational elements that support everything else in your journey to flourish.
                </p>
                <div className="framework-preview__cornerstones">
                  {cornerstones.map((cornerstone) => (
                    <span key={cornerstone} className="cornerstone">{cornerstone}</span>
                  ))}
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-card__header">
                  <div className="feature-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                      <line x1="9" y1="9" x2="9.01" y2="9"/>
                      <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="feature-card__title">10 Pillars of H</h3>
                    <span className="feature-card__badge">Daily Practice</span>
                  </div>
                </div>
                <p className="feature-card__description">
                  The daily practices and principles that help you build a life of purpose and impact.
                </p>
                <ul className="feature-card__list">
                  {pillars.map((pillar) => (
                    <li key={pillar}>{pillar}</li>
                  ))}
                </ul>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Podcasts George Hosts */}
        <section className="section section--warm">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Behind the Mic</span>
              <h2 className="section-header__title">Podcasts George Hosts</h2>
            </AnimatedSection>

            <StaggerContainer className="feature-grid">
              {podcasts.map((podcast) => (
                <a
                  key={podcast.title}
                  href={podcast.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feature-card"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="feature-card__header">
                    <div className="feature-card__icon">
                      {podcast.icon}
                    </div>
                    <div>
                      <h3 className="feature-card__title">{podcast.title}</h3>
                    </div>
                  </div>
                  <p className="feature-card__description">{podcast.description}</p>
                  <div className="feature-card__links">
                    <span className="feature-card__link">
                      Listen Now
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section cta-section-light">
          <div className="container container--narrow">
            <AnimatedSection className="cta-block cta-block--light" animation="fade-in">
              <h2 className="cta-block__title">Ready to Book George?</h2>
              <p className="cta-block__description">
                Get in touch to schedule a pre-interview call or book George directly for your podcast.
              </p>
              <div className="guest-contact-info">
                <p className="guest-contact-item">
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </p>
                <p className="guest-contact-item">
                  <strong>Phone:</strong> {contactInfo.phone}
                </p>
              </div>
              <div className="cta-block__buttons">
                <a
                  href={contactInfo.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large"
                >
                  Schedule a Call
                </a>
                <a
                  href={`mailto:${contactInfo.email}?subject=Podcast%20Guest%20Request`}
                  className="btn btn--secondary btn--large"
                >
                  Send Email
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
