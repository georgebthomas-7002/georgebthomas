'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimatedSection } from './AnimatedSection'

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__container">
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

        <AnimatedSection className="hero__image-wrapper" animation="slide-right">
          {/* Decorative blob shape behind image */}
          <div className="hero__image-blob" aria-hidden="true"></div>

          {/* Accent ring */}
          <div className="hero__image-ring" aria-hidden="true"></div>

          {/* Main image with creative frame */}
          <div className="hero__image-frame">
            <Image
              src="/images/george-hero.png"
              alt="George B. Thomas - Professional Speaker and Coach"
              width={500}
              height={500}
              priority
              className="hero__image"
            />
          </div>

          {/* Floating accent elements */}
          <div className="hero__float-element hero__float-element--1" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </div>
          <div className="hero__float-element hero__float-element--2" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <div className="hero__float-element hero__float-element--3" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
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
