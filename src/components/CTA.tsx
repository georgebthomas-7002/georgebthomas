'use client'

import Link from 'next/link'
import { AnimatedSection } from './AnimatedSection'

export function CTA() {
  return (
    <section id="contact" className="cta section section--warm">
      <div className="container">
        <AnimatedSection className="cta__content" animation="scale">
          <h2 className="cta__title">Ready to Transform Your Journey?</h2>
          <p className="cta__description">
            Whether you&apos;re planning your next event, seeking personal growth, or looking to
            elevate your team, I&apos;m here to help. Let&apos;s start a conversation about how
            we can create something extraordinary together.
          </p>
          <div className="cta__buttons">
            <Link href="mailto:george@georgebthomas.com" className="btn btn--primary btn--large">
              Get in Touch
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </Link>
            <Link href="#speaking" className="btn btn--secondary btn--large">
              Explore Services
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
