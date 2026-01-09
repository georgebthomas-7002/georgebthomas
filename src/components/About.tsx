'use client'

import { AnimatedSection, StaggerContainer } from './AnimatedSection'

const stats = [
  { number: '12+', label: 'Years Experience' },
  { number: '500+', label: 'Keynotes Delivered' },
  { number: '10K+', label: 'Lives Impacted' },
]

export function About() {
  return (
    <section id="about" className="about section section--warm">
      <div className="container">
        <div className="about__grid">
          <AnimatedSection className="about__image-wrapper" animation="slide-left">
            <div className="about__image">
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary-dark) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 'var(--font-size-lg)',
                }}
              >
                [George&apos;s Photo]
              </div>
            </div>
            <div className="about__image-accent" aria-hidden="true"></div>
          </AnimatedSection>

          <AnimatedSection className="about__content" animation="slide-right">
            <span className="about__subtitle">My Story</span>
            <h2 className="about__title">A Catalyst for Transformation</h2>

            <p className="about__text">
              My journey started with a simple belief: every person has untapped potential waiting
              to be unleashed. What began as a passion for helping others grow has evolved into
              a mission to transform how people think, lead, and live.
            </p>

            <p className="about__text">
              Through keynote speaking, personalized coaching, and dynamic workshops, I&apos;ve
              had the privilege of working with organizations and individuals who are ready to
              break through barriers and achieve what they once thought impossible.
            </p>

            <p className="about__text">
              I don&apos;t just share knowledge—I create experiences that spark lasting change.
              My approach blends practical strategies with heartfelt storytelling, ensuring every
              interaction leaves a meaningful impact.
            </p>

            <StaggerContainer className="about__stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="about__stat-number">{stat.number}</div>
                  <div className="about__stat-label">{stat.label}</div>
                </div>
              ))}
            </StaggerContainer>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
