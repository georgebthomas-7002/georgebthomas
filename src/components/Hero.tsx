'use client'

import Link from 'next/link'
import { AnimatedSection } from './AnimatedSection'

export function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <AnimatedSection className="hero__content" animation="fade-in">
          <span className="hero__tagline">Speaker • Coach • Catalyst</span>

          <h1 className="hero__title">
            Helping You Become
            <span className="hero__title-accent"> The Best Version</span>
            of Yourself
          </h1>

          <p className="hero__description">
            For over a decade, I&apos;ve been empowering individuals and organizations
            to unlock their potential, embrace growth, and achieve extraordinary results.
            Let&apos;s transform your journey together.
          </p>

          <div className="hero__cta-group">
            <Link href="#contact" className="btn btn--primary btn--large">
              Book a Keynote
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="#about" className="btn btn--secondary btn--large">
              Learn My Story
            </Link>
          </div>
        </AnimatedSection>
      </div>

      <div className="hero__shape" aria-hidden="true"></div>

      <div className="hero__scroll-indicator">
        <span>Scroll to explore</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  )
}
