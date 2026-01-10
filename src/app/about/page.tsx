'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'
import { TestimonialSection } from '@/components/TestimonialSection'

// Timeline chapters for the story
const storyChapters = [
  {
    year: '1989',
    title: 'The Words That Changed Everything',
    content: `At 17, sitting in a high school classroom, a math teacher looked me in the eye and said, "You will never amount to anything." Six months later, I dropped out and joined the United States Navy. For years, those words haunted me. Today, I'm grateful for them. They lit a fire that has never gone out and set me on a path to become the educator and encourager I wish I'd had.`,
    image: '/images/george-football.jpg',
    imageAlt: 'George B. Thomas in high school',
  },
  {
    year: '2007',
    title: 'When Are You Gonna Realize?',
    content: `Working as a youth pastor while studying at Pizza Hut, I found myself questioning everything. During a mission trip to Montana, a woman named Prophetess Juanita pulled me aside and asked, "When are you gonna realize you're the blessing?" That question shifted my entire perspective. I stopped seeking blessings and started becoming one.`,
    image: '/images/george-early-career.jpg',
    imageAlt: 'George B. Thomas early career',
  },
  {
    year: '2010',
    title: 'The Blue Windbreaker Interview',
    content: `I showed up to an Akron agency interview wearing a blue windbreaker with no portfolio. When asked if I knew InDesign, I replied, "No. But I can learn it." I spent the weekend completing four Lynda.com certifications. Monday morning, my supervisor Eric Jacobs smiled and said, "See? I told you." That moment taught me that willingness to learn beats existing knowledge every time.`,
    image: null,
    imageAlt: '',
  },
  {
    year: '2012',
    title: 'The HubSpot Awakening',
    content: `My agency team won free INBOUND tickets by tweeting about HubSpot's "world's largest webinar." Walking into that Boston convention center changed my trajectory forever. I watched Gary Vee perform, absorbed the human-centric marketing philosophy, and had a realization that still guides me: "I want to be a marketer when I grow up." I dove into HubSpot Academy and never looked back.`,
    image: '/images/george-inbound-2012.jpg',
    imageAlt: 'George at INBOUND 2012',
  },
  {
    year: '2017',
    title: 'The Sales Lion & Finding My Voice',
    content: `Marcus Sheridan invited me to join The Sales Lion. I told my wife, "I honestly feel like I just won the marketing lottery." When Marcus asked me to start a podcast, I said, "There is absolutely no way I'm going to do that." 271 episodes of The Hubcast later, I found my voice. Marcus taught me something crucial: "Until you embrace being vulnerable, you're gonna miss out on the magic." My first keynote about being a high school dropout proved him right.`,
    image: '/images/george-wild-inbound.webp',
    imageAlt: 'George speaking at INBOUND',
  },
  {
    year: '2022',
    title: 'Sidekick Strategies is Born',
    content: `When I launched George B. Thomas, LLC, I swore to myself the last thing I would ever create was an agency. "It was just me, helping a few businesses make sense of HubSpot." But the HubSpot community had other plans. Business owners, marketers, and agency leaders kept finding me. I looked around one day and realized I had three contractors working with me weekly. I said to myself, "We're literally running an agency and not calling it one." Sidekick Strategies was born—built on a radical idea: family comes first.`,
    image: null,
    imageAlt: '',
  },
  {
    year: '2023',
    title: 'The Spiritual Side of Leadership',
    content: `Despite outward success, I hit a wall. 40+ HubSpot certifications, speaking at INBOUND every year since 2015, a thriving agency—but something was missing. What began as my own daily wisdom practice evolved into Spiritual Side of Leadership, a platform helping leaders integrate faith with their work. I created the Superhuman Framework: four cornerstones (Love, Purpose, Passion, Persistence) and ten pillars that help leaders flourish without sacrificing their soul.`,
    image: null,
    imageAlt: '',
  },
  {
    year: 'Today',
    title: 'The FEAM & Beyond',
    content: `Today, Sidekick Strategies is powered by what we call "the FEAM"—a blend of "family" and "team" where family always comes first. My wife and children contribute their talents alongside our partners. We've amassed 124+ HubSpot certifications, created 2000+ educational videos and podcast episodes, and serve client-friends who feel like family. As my wife jokes, "You don't have clients, you have friends." Through it all, I've learned that the teacher was wrong. I did amount to something: a husband, father, believer, and sidekick helping others become the superhumans they were always meant to be.`,
    image: '/images/george-family.jpg',
    imageAlt: 'The Thomas Family',
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
    description: 'Technology and AI should amplify human connection, never replace it. Every decision starts with people.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Sidekick Mentality',
    description: 'I am not here to be the hero. I am here to help you become one. Your success is my success.',
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
    description: 'Success without soul is empty. I believe in leading with purpose, flourishing with faith.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Lifelong Learner',
    description: 'From that weekend with Lynda.com to today, I believe willingness to learn beats existing knowledge every time.',
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
      <main>
        {/* Hero Section */}
        <section className="page-hero page-hero--about">
          <div className="container page-hero__grid">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">Father. Husband. Marketer. Believer.</span>
              <h1 className="page-hero__title">
                My Name is
                <span className="page-hero__title-accent"> George B. Thomas</span>
              </h1>
              <p className="page-hero__description">
                I believe journeys matter. I am committed to sharing my story so that together,
                through mutual understanding and connection, we can unlock your potential and
                empower you to become the superhuman you were always meant to be.
              </p>
              <div className="page-hero__cta-group">
                <Link href="/coaching" className="btn btn--primary">
                  Work With Me
                </Link>
                <a href="#story" className="btn btn--secondary">
                  Read My Story
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection className="page-hero__image-wrapper page-hero__image-wrapper--about" animation="slide-right">
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

        {/* Stats Section */}
        <section className="section section--compact about-stats">
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

        {/* Story Timeline Section */}
        <section id="story" className="section about-story">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">The Journey</span>
              <h2 className="section-header__title">From Dropout to Difference-Maker</h2>
              <p className="section-header__description">
                Every chapter taught me something. Every setback became setup for something greater.
              </p>
            </AnimatedSection>

            <div className="story-timeline">
              {storyChapters.map((chapter, index) => (
                <AnimatedSection
                  key={chapter.year}
                  className={`story-chapter ${index % 2 === 1 ? 'story-chapter--reverse' : ''}`}
                  animation="fade-in"
                >
                  <div className="story-chapter__marker">
                    <span className="story-chapter__year">{chapter.year}</span>
                    <div className="story-chapter__dot"></div>
                  </div>

                  <div className="story-chapter__content">
                    <h3 className="story-chapter__title">{chapter.title}</h3>
                    <p className="story-chapter__text">{chapter.content}</p>
                  </div>

                  {chapter.image && (
                    <div className="story-chapter__image-wrapper">
                      <Image
                        src={chapter.image}
                        alt={chapter.imageAlt}
                        width={300}
                        height={200}
                        className="story-chapter__image"
                      />
                    </div>
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section section--warm about-values">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">What I Believe</span>
              <h2 className="section-header__title">Core Values</h2>
            </AnimatedSection>

            <StaggerContainer className="values-grid">
              {values.map((value) => (
                <div key={value.title} className="value-card">
                  <div className="value-card__icon">{value.icon}</div>
                  <h3 className="value-card__title">{value.title}</h3>
                  <p className="value-card__description">{value.description}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Quote Section */}
        <section className="section section--dark about-quote">
          <div className="container container--narrow">
            <AnimatedSection className="featured-quote" animation="fade-in">
              <div className="featured-quote__mark">&quot;</div>
              <blockquote className="featured-quote__text">
                Until you embrace being vulnerable, you&apos;re gonna miss out on the magic.
              </blockquote>
              <cite className="featured-quote__attribution">
                — Marcus Sheridan, mentor and friend
              </cite>
            </AnimatedSection>
          </div>
        </section>

        {/* Superhuman Framework Preview */}
        <section className="section about-framework">
          <div className="container">
            <div className="framework-preview">
              <AnimatedSection className="framework-preview__content" animation="fade-in">
                <span className="section-header__subtitle">The Philosophy</span>
                <h2 className="section-header__title">The Superhuman Framework</h2>
                <p className="framework-preview__description">
                  Through years of learning, failing, and growing, I developed a framework for
                  living and leading with purpose. It&apos;s built on four cornerstones—Love, Purpose,
                  Passion, and Persistence—and ten pillars that help humans flourish without
                  sacrificing their soul.
                </p>
                <div className="framework-preview__cornerstones">
                  <span className="cornerstone">Love</span>
                  <span className="cornerstone">Purpose</span>
                  <span className="cornerstone">Passion</span>
                  <span className="cornerstone">Persistence</span>
                </div>
                <Link href="/coaching" className="btn btn--primary">
                  Learn How I Can Help You
                </Link>
              </AnimatedSection>
              <AnimatedSection className="framework-preview__visual" animation="slide-right">
                <Image
                  src="/images/george-expertise.jpg"
                  alt="George B. Thomas speaking"
                  width={500}
                  height={400}
                  className="framework-preview__image"
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSection
          title="What Humans Say"
          subtitle="In Their Words"
        />

        {/* CTA Section */}
        <section className="section section--warm about-cta">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Ready to Start Your Journey?</h2>
              <p className="cta-block__description">
                Whether you need help with HubSpot, want coaching to reach your next level,
                or need a speaker who connects with audiences—I&apos;m here to be your sidekick.
              </p>
              <div className="cta-block__buttons">
                <Link href="/coaching/apply" className="btn btn--primary btn--large">
                  Apply for Coaching
                </Link>
                <Link href="/speaking" className="btn btn--secondary btn--large">
                  Book Me to Speak
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
