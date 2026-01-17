'use client'

import { useState, useCallback, useRef, TouchEvent } from 'react'

export interface PodcastEpisode {
  id: string
  showName: string
  episodeTitle: string
  description: string
  platform: 'spotify' | 'apple' | 'youtube' | 'web'
  listenUrl: string
}

interface PodcastSliderProps {
  episodes: PodcastEpisode[]
}

// Platform icons and colors
const platformConfig = {
  spotify: {
    name: 'Spotify',
    color: '#1DB954',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  apple: {
    name: 'Apple Podcasts',
    color: '#9B4DCA',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.3 1.924 2.8 2.125 4.528.058.498-.295.932-.79.992-.498.058-.932-.295-.992-.79-.148-1.274-.667-2.394-1.564-3.343-1.271-1.333-2.947-2.048-4.835-2.048-1.888 0-3.564.715-4.835 2.048-.89.948-1.408 2.06-1.556 3.323-.06.494-.494.84-.99.782-.494-.06-.84-.495-.78-.99.199-1.708.89-3.19 2.106-4.481 1.608-1.685 3.72-2.608 6.055-2.608zm.034 4.715c1.386 0 2.61.525 3.56 1.524.674.706 1.091 1.542 1.243 2.486.063.39.032.776-.09 1.14a3.442 3.442 0 01-.74 1.31c-.305.359-.673.647-1.09.866l-.028.015c-.416.217-.656.635-.656 1.096v2.39a1.282 1.282 0 01-.615 1.089l-.026.017a1.22 1.22 0 01-1.084.121 1.24 1.24 0 01-.51-.345l-.02-.023a1.244 1.244 0 01-.297-.83v-2.42c0-.46-.24-.879-.656-1.096l-.03-.015c-.415-.22-.782-.508-1.087-.866a3.442 3.442 0 01-.74-1.31 2.26 2.26 0 01-.09-1.14c.152-.944.57-1.78 1.244-2.486.948-.999 2.173-1.523 3.56-1.523h-.038zm0 1.844c-.855 0-1.594.328-2.17.94-.404.429-.664.947-.773 1.535-.04.213-.025.397.043.55.076.17.199.333.376.497.172.16.373.287.598.384l.036.015a2.964 2.964 0 011.456 2.579v2.04c.142.019.287.019.43 0V15.63c0-1.093.575-2.098 1.456-2.579l.036-.015c.225-.096.426-.224.598-.384.177-.164.3-.327.376-.497a.81.81 0 00.043-.55c-.11-.588-.369-1.106-.773-1.535-.576-.612-1.315-.94-2.17-.94h-.562z"/>
      </svg>
    ),
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  web: {
    name: 'Website',
    color: '#2D4A6F',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
}

export function PodcastSlider({ episodes }: PodcastSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Touch/swipe handling
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const minSwipeDistance = 50

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    // Reset
    touchStartX.current = 0
    touchEndX.current = 0
  }

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % episodes.length)
  }, [currentIndex, episodes.length, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + episodes.length) % episodes.length)
  }, [currentIndex, episodes.length, goToSlide])

  const currentEpisode = episodes[currentIndex]
  const platform = platformConfig[currentEpisode.platform]

  if (episodes.length === 0) return null

  return (
    <div
      className="podcast-slider"
      role="region"
      aria-label="Podcast appearances gallery"
      aria-roledescription="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="podcast-slider__container">
        {/* Main Card */}
        <div
          className={`podcast-slider__card ${isAnimating ? 'podcast-slider__card--animating' : ''}`}
          aria-live="polite"
        >
          <div
            className="podcast-slider__platform-icon"
            style={{ '--platform-color': platform.color } as React.CSSProperties}
          >
            {platform.icon}
          </div>

          <span className="podcast-slider__show-name">{currentEpisode.showName}</span>

          <h3 className="podcast-slider__episode-title">{currentEpisode.episodeTitle}</h3>

          <p className="podcast-slider__description">{currentEpisode.description}</p>

          <a
            href={currentEpisode.listenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="podcast-slider__listen-btn"
          >
            Listen Now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        {/* Navigation */}
        <div className="podcast-slider__nav">
          <button
            className="podcast-slider__arrow podcast-slider__arrow--prev"
            onClick={prevSlide}
            aria-label="Previous episode"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="podcast-slider__dots">
            {episodes.map((_, index) => (
              <button
                key={index}
                className={`podcast-slider__dot ${index === currentIndex ? 'podcast-slider__dot--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to episode ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="podcast-slider__arrow podcast-slider__arrow--next"
            onClick={nextSlide}
            aria-label="Next episode"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Counter */}
        <div className="podcast-slider__counter">
          <span className="podcast-slider__counter-current">{currentIndex + 1}</span>
          <span className="podcast-slider__counter-separator">/</span>
          <span className="podcast-slider__counter-total">{episodes.length}</span>
        </div>
      </div>
    </div>
  )
}
