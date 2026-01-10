'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface Testimonial {
  quote: string
  name: string
  title: string
  company?: string
  image?: string
}

// Real testimonials from Sidekick Strategies clients
export const realTestimonials: Testimonial[] = [
  {
    quote: "Working with George and his team at Sidekick Strategies has been amazing! He and his team are the first time in almost fifteen years that I've worked with a marketing professional and team where I actually feel like what we said we were going to do is getting done! They bring an energy and personality that is fun and easy to connect with. World class client service is found from these amazing human beings.",
    name: "Chris Middleton",
    title: "Founder",
    company: "Make Taxes Fair",
    image: "/images/testimonials/chris-middleton.jpg"
  },
  {
    quote: "What I love about George and his team is that they actually take the time to listen to where I'm trying to go, and come back with solutions to make my vision happen. George has my HubSpot working as a true REVENUE source for my business. Sidekick Strategies is simply the BEST!",
    name: "Mick Hunt",
    title: "CEO",
    company: "Mick Unplugged",
    image: "/images/testimonials/mick-hunt.jpg"
  },
  {
    quote: "I've been working with George B. Thomas for over four years at this point, and I don't know where we'd be without him. His mastery of HubSpot, combined with his thoughtful insight and marketing best practices, makes him a true powerhouse! No matter what I throw at him or the crazy ideas I have, he's always able to distill it down to an actionable plan that results in great success.",
    name: "Victoria Van Horsen",
    title: "Innovative Problem-Solver",
    company: "",
    image: "/images/testimonials/victoria-van-horsen.jpg"
  },
  {
    quote: "I love working with Sidekick Strategies. I have known George for many years, and have worked with him across multiple companies. When I ask for something, he finds a way to make it happen and is great at offering helpful alternatives that can be implemented quicker. His focus on HELPING is unmatched. George is THE HubSpot Helper your company needs!",
    name: "Chris Handy",
    title: "Product Marketing Leader",
    company: "",
    image: "/images/testimonials/chris-handy.jpg"
  },
  {
    quote: "I don't want you to hire George! We made more progress with George in a week than in 2 months with an agency. His ability to quickly understand our needs and deliver results is unmatched.",
    name: "Joe Rando",
    title: "Owner",
    company: "LifeStarr",
    image: "/images/testimonials/joe-rando.jpg"
  },
  {
    quote: "George's passion for helping others shines through in all his work. Whether he's on stage at Social Media World in front of thousands or on a HubSpot onboarding call with one person, his energy, care and desire to teach shine through. Whether you're hiring George to speak, consult or teach, you'll get a human who comes through with everything you're asking for and more.",
    name: "Dan Moyle",
    title: "Video Marketing Expert",
    company: "Digital Reach Online Solutions",
    image: ""
  },
  {
    quote: "I've experienced several HubSpot onboarding programs in the past, but George B. Thomas is by far the best HubSpot onboarding specialist I've had the pleasure of working with. Not only does he thoroughly train you on the HubSpot platform, but he also provides invaluable HubSpot hacks that are tailored to your business needs.",
    name: "Courtney Stephens",
    title: "Marketing Consultant",
    company: "",
    image: "/images/testimonials/courtney-stephens.jpg"
  },
  {
    quote: "I can't overstate the value George has added to my business. He's technically skilled and provides insightful advice. His ability to take complex concepts and make them accessible has transformed how I approach everything.",
    name: "Mark Newton",
    title: "Certified Structured Settlement Consultant",
    company: "",
    image: "/images/testimonials/mark-newton.jpg"
  },
  {
    quote: "George is FIRE! He has amazing technical knowledge and great people skills. You'll feel more confident after each encounter. His ability to simplify complex marketing strategies while keeping the human element front and center is remarkable.",
    name: "Heather Palermo",
    title: "Marketer",
    company: "Kiazen CPAs",
    image: "/images/testimonials/heather-palermo.jpg"
  },
  {
    quote: "To put it bluntly, George is a HubSpot genius. His follow-through and training make him invaluable. He doesn't just teach you what to do, he helps you understand why it matters.",
    name: "Chris Tschantz",
    title: "President & CCO",
    company: "Test Pilot Creative",
    image: "/images/testimonials/chris-tschantz.jpg"
  },
  {
    quote: "George is a force of positive energy who makes learning entertaining! He over-delivered on his training promise. His enthusiasm is contagious and his expertise is evident in every interaction.",
    name: "Frances K. Bowman",
    title: "Digital Marketer & Education Advocate",
    company: "",
    image: "/images/testimonials/frances-bowman.jpg"
  },
  {
    quote: "He exuded great stage presence, and he lifted the energy of the room with skill and humor! If you get the chance to work with George as a Keynote Speaker or Emcee, grab it with both hands!",
    name: "Donna Moritz",
    title: "Visual Content Strategist",
    company: "Socially Sorted",
    image: "/images/testimonials/donna-moritz.jpg"
  },
]

interface TestimonialSliderProps {
  testimonials?: Testimonial[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function TestimonialSlider({
  testimonials = realTestimonials,
  autoPlay = true,
  autoPlayInterval = 6000,
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % testimonials.length)
  }, [currentIndex, testimonials.length, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length)
  }, [currentIndex, testimonials.length, goToSlide])

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isPaused, nextSlide])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div
      className="testimonial-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="testimonial-slider__container">
        {/* Quote Icon */}
        <div className="testimonial-slider__quote-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
          </svg>
        </div>

        {/* Main Content */}
        <div className={`testimonial-slider__content ${isAnimating ? 'testimonial-slider__content--animating' : ''}`}>
          <blockquote className="testimonial-slider__quote">
            {currentTestimonial.quote}
          </blockquote>

          <div className="testimonial-slider__author">
            <div className="testimonial-slider__avatar">
              {currentTestimonial.image ? (
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  width={64}
                  height={64}
                  className="testimonial-slider__avatar-image"
                />
              ) : (
                <div className="testimonial-slider__avatar-placeholder">
                  {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div className="testimonial-slider__author-info">
              <span className="testimonial-slider__name">{currentTestimonial.name}</span>
              <span className="testimonial-slider__title">
                {currentTestimonial.title}
                {currentTestimonial.company && `, ${currentTestimonial.company}`}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="testimonial-slider__nav">
          <button
            className="testimonial-slider__arrow testimonial-slider__arrow--prev"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="testimonial-slider__dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-slider__dot ${index === currentIndex ? 'testimonial-slider__dot--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="testimonial-slider__arrow testimonial-slider__arrow--next"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {autoPlay && (
          <div className="testimonial-slider__progress">
            <div
              className="testimonial-slider__progress-bar"
              style={{
                animationDuration: `${autoPlayInterval}ms`,
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
              key={currentIndex}
            />
          </div>
        )}
      </div>

      {/* Counter */}
      <div className="testimonial-slider__counter">
        <span className="testimonial-slider__counter-current">{currentIndex + 1}</span>
        <span className="testimonial-slider__counter-separator">/</span>
        <span className="testimonial-slider__counter-total">{testimonials.length}</span>
      </div>
    </div>
  )
}
