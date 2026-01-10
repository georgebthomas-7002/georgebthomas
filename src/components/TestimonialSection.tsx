'use client'

import Link from 'next/link'
import { TestimonialSlider, Testimonial, realTestimonials } from './TestimonialSlider'
import { AnimatedSection } from './AnimatedSection'

interface TestimonialSectionProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showHeader?: boolean
  showCta?: boolean
  ctaText?: string
  ctaLink?: string
  className?: string
}

export function TestimonialSection({
  title = "What Humans Say",
  subtitle = "Growth & Success",
  testimonials = realTestimonials,
  autoPlay = true,
  autoPlayInterval = 8000,
  showHeader = true,
  showCta = true,
  ctaText = "Read All Testimonials",
  ctaLink = "/testimonials",
  className = "",
}: TestimonialSectionProps) {
  return (
    <section className={`section section--dark testimonial-section-animated ${className}`}>
      {/* Animated background elements */}
      <div className="testimonial-section-animated__bg" aria-hidden="true">
        <div className="testimonial-section-animated__orb testimonial-section-animated__orb--1"></div>
        <div className="testimonial-section-animated__orb testimonial-section-animated__orb--2"></div>
        <div className="testimonial-section-animated__orb testimonial-section-animated__orb--3"></div>
        <div className="testimonial-section-animated__glow"></div>
      </div>
      <div className="container">
        {showHeader && (
          <AnimatedSection className="section-header" animation="fade-in">
            <span className="section-header__subtitle">{subtitle}</span>
            <h2 className="section-header__title">{title}</h2>
          </AnimatedSection>
        )}
        <AnimatedSection animation="fade-in">
          <TestimonialSlider
            testimonials={testimonials}
            autoPlay={autoPlay}
            autoPlayInterval={autoPlayInterval}
          />
        </AnimatedSection>
        {showCta && (
          <AnimatedSection className="testimonial-section__cta" animation="fade-in">
            <Link href={ctaLink} className="btn btn--accent">
              {ctaText}
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}
