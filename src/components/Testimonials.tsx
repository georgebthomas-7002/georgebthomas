'use client'

import Image from 'next/image'
import { AnimatedSection } from './AnimatedSection'

const testimonials = [
  {
    quote: "George doesn't just speak—he transforms rooms. His energy is contagious, and the insights he shared continue to resonate with our team months later. Absolutely world-class.",
    name: 'Sarah Mitchell',
    role: 'VP of Marketing, TechCorp',
    avatar: null,
  },
  {
    quote: "Working with George as a coach changed my trajectory as a leader. He has this incredible ability to see potential you didn't even know you had and help you unlock it.",
    name: 'Marcus Johnson',
    role: 'CEO, Growth Dynamics',
    avatar: null,
  },
  {
    quote: "We've had dozens of speakers at our annual conference, but George stands out. His Superhuman Framework gave our attendees practical tools they could apply immediately.",
    name: 'Jennifer Chen',
    role: 'Event Director, INBOUND',
    avatar: null,
  },
  {
    quote: "George's HubSpot expertise combined with his coaching approach helped us 3x our pipeline in six months. He doesn't just teach—he transforms how you think about growth.",
    name: 'David Rodriguez',
    role: 'Founder, ScaleUp Agency',
    avatar: null,
  },
  {
    quote: "Having George B Thomas on the AgencyRise Podcast was an absolute joy. Hearing his journey—from high school dropout to respected HubSpot expert and Inbound speaker—was genuinely inspiring. Not hype. Not polished. Just real, gritty, this-was-earned kind of growth. On top of that, he shared incredibly practical marketing insights that agency owners can actually use right now. What stood out most was George's grounded approach. No fluff. No ego. Just honest perspective, strong convictions, and a clear heart for serving others. He brought energy, depth, and a level of authenticity that made the conversation effortless. I'll definitely be having George back on the podcast.",
    name: 'Chris Rudolph',
    role: 'Host, AgencyRise Podcast',
    avatar: '/images/chris-rudolph.webp',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section section--dark">
      <div className="container">
        <AnimatedSection className="testimonials__header" animation="fade-in">
          <span className="testimonials__subtitle">What Others Say</span>
          <h2>Stories of Transformation</h2>
        </AnimatedSection>

        <div className="testimonials__slider">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection
              key={index}
              className="testimonial-card"
              animation="scale"
              delay={index * 100}
            >
              <p className="testimonial-card__quote">{testimonial.quote}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="testimonial-card__avatar-img"
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="testimonial-card__name">{testimonial.name}</div>
                  <div className="testimonial-card__role">{testimonial.role}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
