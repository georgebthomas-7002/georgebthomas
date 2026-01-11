'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { VideoShowcase } from './VideoShowcase'

export interface VideoItem {
  id: string
  youtubeId: string
  title: string
  description?: string
}

interface VideoSliderProps {
  videos: VideoItem[]
  title?: string
  subtitle?: string
  /** Use the creative VideoShowcase styling for the main video */
  useShowcaseStyle?: boolean
}

export function VideoSlider({
  videos,
  title = "See More Speaking Highlights",
  subtitle = "More Examples",
  useShowcaseStyle = true
}: VideoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % videos.length)
  }, [currentIndex, videos.length, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + videos.length) % videos.length)
  }, [currentIndex, videos.length, goToSlide])

  const currentVideo = videos[currentIndex]

  if (videos.length === 0) return null

  return (
    <section className="section section--dark video-slider-section">
      <div className="container">
        <div className="section-header">
          <span className="section-header__subtitle">{subtitle}</span>
          <h2 className="section-header__title">{title}</h2>
        </div>

        <div className="video-slider" role="region" aria-label="Video gallery" aria-roledescription="carousel">
          <div className="video-slider__container">
            {/* Main Video */}
            <div className={`video-slider__main ${isAnimating ? 'video-slider__main--animating' : ''}`} aria-live="polite">
              {useShowcaseStyle ? (
                <VideoShowcase
                  youtubeId={currentVideo.youtubeId}
                  title={currentVideo.title}
                  size="compact"
                  showAccents={false}
                />
              ) : (
                <div className="video-slider__embed">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
                    title={currentVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="video-slider__info">
                <h3 className="video-slider__title">{currentVideo.title}</h3>
                {currentVideo.description && (
                  <p className="video-slider__description">{currentVideo.description}</p>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="video-slider__nav">
              <button
                className="video-slider__arrow video-slider__arrow--prev"
                onClick={prevSlide}
                aria-label="Previous video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>

              <div className="video-slider__dots">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    className={`video-slider__dot ${index === currentIndex ? 'video-slider__dot--active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="video-slider__arrow video-slider__arrow--next"
                onClick={nextSlide}
                aria-label="Next video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

            {/* Counter */}
            <div className="video-slider__counter">
              <span className="video-slider__counter-current">{currentIndex + 1}</span>
              <span className="video-slider__counter-separator">/</span>
              <span className="video-slider__counter-total">{videos.length}</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {videos.length > 1 && (
            <div className="video-slider__thumbnails">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  className={`video-slider__thumbnail ${index === currentIndex ? 'video-slider__thumbnail--active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Play ${video.title}`}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={`Thumbnail for ${video.title}`}
                    width={320}
                    height={180}
                    className="video-slider__thumbnail-img"
                  />
                  <div className="video-slider__thumbnail-overlay">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
