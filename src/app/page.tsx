'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'
import { TestimonialSection } from '@/components/TestimonialSection'
import { deepExpertise } from '@/data/expertise'

// Core services with links
const coreServices = [
  {
    id: 'speaking',
    title: 'Keynote Speaking',
    description: 'Energize your audience with powerful keynotes that inspire action, challenge perspectives, and deliver lasting impact.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    link: '/speaking',
    stats: ['INBOUND Since 2015', '100+ Stages', 'All American Speakers'],
  },
  {
    id: 'coaching',
    title: '1:1 Coaching',
    description: 'Transform your mindset, master HubSpot, or unlock your potential with personalized coaching designed around you.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    link: '/coaching',
    stats: ['$200/hour', '100s Helped', 'Superhuman Framework'],
  },
  {
    id: 'hubspot',
    title: 'HubSpot Mastery',
    description: 'With 12+ years and 42+ certifications, get world-class HubSpot strategy, training, and implementation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    link: 'https://sidekickstrategies.com/',
    external: true,
    stats: ['42+ Certs', '12+ Years', 'Certified Trainer'],
  },
]

// Hero stats
const heroStats = [
  { value: '30+', label: 'Years Experience' },
  { value: '16M+', label: 'Words Created' },
  { value: '400+', label: 'Podcast Episodes' },
  { value: '42+', label: 'HubSpot Certs' },
]

// Expertise areas for preview
const expertisePreview = deepExpertise.slice(0, 4)

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section - V2 */}
        <section className="page-hero page-hero--home">
          <div className="container page-hero__grid">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">Speaker • Coach • HubSpot Expert</span>
              <h1 className="page-hero__title">
                Helping You Become
                <span className="page-hero__title-accent">Superhuman</span>
              </h1>
              <p className="page-hero__description">
                You've got untapped potential waiting to be unleashed. Whether you need a
                <strong> keynote that inspires your team</strong>, <strong>coaching that transforms your mindset</strong>, or
                <strong> HubSpot expertise that accelerates your growth</strong>, you'll have a dedicated sidekick
                with 30+ years of experience on your journey to becoming superhuman.
              </p>
              <div className="page-hero__cta-group">
                <Link href="/speaking" className="btn btn--primary">
                  Ignite Your Event
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link href="/coaching/apply" className="btn btn--secondary">
                  Start Your Transformation
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection className="page-hero__image-wrapper page-hero__image-wrapper--home" animation="slide-right">
              <div className="page-hero__image-frame" aria-hidden="true"></div>
              <div className="page-hero__image-accent" aria-hidden="true"></div>
              <div className="page-hero__image-container">
                <Image
                  src="/images/george-hero.png"
                  alt="George B. Thomas - Professional Speaker and Coach"
                  width={500}
                  height={600}
                  priority
                  className="page-hero__image"
                />
              </div>
            </AnimatedSection>
          </div>
          <div className="page-hero__shape" aria-hidden="true"></div>

          {/* Scroll indicator */}
          <div className="hero__scroll-indicator">
            <span>Scroll to explore</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="section section--compact hero-stats">
          <div className="container">
            <StaggerContainer className="stats-row">
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-item__value">{stat.value}</span>
                  <span className="stat-item__label">{stat.label}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* How I Help Section */}
        <section className="section section--warm home-services">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Your Path Forward</span>
              <h2 className="section-header__title">Three Ways to Transform Your World</h2>
              <p className="section-header__description">
                Whether you're looking to inspire your team, grow personally, or
                maximize your HubSpot investment, you'll get the experience and passion you need to succeed.
              </p>
            </AnimatedSection>

            <div className="home-services__grid">
              {coreServices.map((service) => (
                <AnimatedSection
                  key={service.id}
                  className="home-service-card"
                  animation="fade-in"
                >
                  <div className="home-service-card__icon">{service.icon}</div>
                  <h3 className="home-service-card__title">{service.title}</h3>
                  <p className="home-service-card__description">{service.description}</p>

                  <div className="home-service-card__stats">
                    {service.stats.map((stat) => (
                      <span key={stat} className="home-service-card__stat">{stat}</span>
                    ))}
                  </div>

                  {service.external ? (
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-service-card__link"
                    >
                      Learn More →
                    </a>
                  ) : (
                    <Link href={service.link} className="home-service-card__link">
                      Learn More →
                    </Link>
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section home-story">
          <div className="container">
            <div className="home-story__grid">
              <AnimatedSection className="home-story__image-wrapper" animation="slide-left">
                <div className="home-story__image-frame" aria-hidden="true"></div>
                <div className="home-story__image-accent" aria-hidden="true"></div>
                <Image
                  src="/images/george-highschool.webp"
                  alt="George B. Thomas in high school"
                  width={400}
                  height={500}
                  className="home-story__image"
                />
              </AnimatedSection>

              <AnimatedSection className="home-story__content" animation="slide-right">
                <span className="section-header__subtitle">My Story</span>
                <h2 className="home-story__title">From Dropout to Industry Expert</h2>

                <p className="home-story__text">
                  At 17, a teacher told me I'd never amount to anything. That moment became
                  the catalyst for an extraordinary transformation, and it's the same kind of breakthrough you can experience.
                </p>

                <p className="home-story__text">
                  Today, that story of transformation is yours to claim too. With 30+ years of experience, 400+ podcast episodes, and 16+ million words
                  of content, I've developed the <a href="https://superhumanframework.com/" target="_blank" rel="noopener noreferrer" className="text-link"><strong>Superhuman Framework</strong></a>, designed to help you unlock your own extraordinary potential.
                </p>

                <blockquote className="home-story__quote">
                  "I'm not here to be the hero of your story. I'm here to be the sidekick
                  that helps you become the superhuman you were meant to be."
                </blockquote>

                <div className="home-story__buttons">
                  <Link href="/about" className="btn btn--primary">
                    Discover the Journey
                  </Link>
                  <Link href="/expertise" className="btn btn--secondary">
                    See How You'll Benefit
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Expertise Preview */}
        <section className="section home-expertise">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">T-Shaped Expertise</span>
              <h2 className="section-header__title">Deep Knowledge, Broad Vision for You</h2>
              <p className="section-header__description">
                You deserve more than a one-dimensional expert. You'll get deep expertise across eight pillars,
                all converging to help you achieve your transformation.
              </p>
            </AnimatedSection>

            <StaggerContainer className="home-expertise__grid">
              {expertisePreview.map((expertise) => (
                <div key={expertise.id} className="expertise-preview-card">
                  <div className="expertise-preview-card__icon">{expertise.icon}</div>
                  <h3 className="expertise-preview-card__title">{expertise.area}</h3>
                  <span className="expertise-preview-card__level">{expertise.level}</span>
                </div>
              ))}
            </StaggerContainer>

            <AnimatedSection className="home-expertise__cta" animation="fade-in">
              <Link href="/expertise" className="btn btn--primary">
                View All 8 Pillars of Expertise
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection
          title="What People Say"
          subtitle="Client Success"
        />

        {/* CTA Section */}
        <section className="section home-cta home-cta--warm">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Ready to Transform?</h2>
              <p className="cta-block__description">
                Whether you need a keynote that inspires, coaching that transforms, or
                HubSpot expertise that accelerates, let's start a conversation.
              </p>
              <div className="cta-block__buttons">
                <Link href="/speaking" className="btn btn--primary">
                  Ignite Your Event
                </Link>
                <Link href="/coaching/apply" className="btn btn--secondary">
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
