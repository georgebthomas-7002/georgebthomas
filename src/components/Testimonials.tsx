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
                      alt={`${testimonial.name} avatar`}
                      width={48}
                      height={48}
                      style={{ objectFit: 'cover' }}
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
