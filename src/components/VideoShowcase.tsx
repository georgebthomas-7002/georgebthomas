'use client'

import { useState } from 'react'
import Image from 'next/image'

interface VideoShowcaseProps {
  /** YouTube video ID (e.g., 'jIMAkDBsI8c') */
  youtubeId: string
  /** Video title for accessibility */
  title: string
  /** Optional caption displayed below the video */
  caption?: string
  /** Show decorative corner frames (default: true) */
  showCorners?: boolean
  /** Show pulsing glow effect (default: true) */
  showGlow?: boolean
  /** Show floating accent elements (default: true) */
  showAccents?: boolean
  /** Size variant */
  size?: 'default' | 'large' | 'compact'
  /** Additional CSS class */
  className?: string
  /** Auto-play when clicked (default: true) */
  autoPlay?: boolean
}

export function VideoShowcase({
  youtubeId,
  title,
  caption,
  showCorners = true,
  showGlow = true,
  showAccents = true,
  size = 'default',
  className = '',
  autoPlay = true,
}: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const sizeClass = size !== 'default' ? `video-showcase--${size}` : ''

  const handlePlay = () => {
    setIsPlaying(true)
  }

  // Use maxresdefault for best quality, fallback handled by CSS
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

  return (
    <div className={`video-showcase-wrapper ${className}`.trim()}>
      <div className={`video-showcase ${sizeClass}`.trim()}>
        {/* Decorative corner frame elements */}
        {showCorners && (
          <div className="video-showcase__frame" aria-hidden="true">
            <span className="video-showcase__corner video-showcase__corner--tl"></span>
            <span className="video-showcase__corner video-showcase__corner--tr"></span>
            <span className="video-showcase__corner video-showcase__corner--bl"></span>
            <span className="video-showcase__corner video-showcase__corner--br"></span>
          </div>
        )}

        {/* Accent glow behind video */}
        {showGlow && (
          <div className="video-showcase__glow" aria-hidden="true"></div>
        )}

        {/* Video container */}
        <div className="video-showcase__container">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoPlay ? 1 : 0}&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              className="video-showcase__thumbnail-btn"
              onClick={handlePlay}
              aria-label={`Play video: ${title}`}
            >
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="video-showcase__thumbnail-img"
                priority
              />
              {/* Branded orange play button */}
              <div className="video-showcase__play-btn" aria-hidden="true">
                <svg viewBox="0 0 68 48" fill="none">
                  {/* Rounded rectangle background */}
                  <rect
                    x="0"
                    y="0"
                    width="68"
                    height="48"
                    rx="12"
                    fill="var(--color-accent)"
                  />
                  {/* Play triangle */}
                  <polygon
                    points="28,16 28,32 44,24"
                    fill="white"
                  />
                </svg>
              </div>
            </button>
          )}
        </div>

        {/* Floating accent elements */}
        {showAccents && (
          <>
            <div className="video-showcase__accent video-showcase__accent--1" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
            <div className="video-showcase__accent video-showcase__accent--2" aria-hidden="true"></div>
            <div className="video-showcase__accent video-showcase__accent--3" aria-hidden="true"></div>
          </>
        )}
      </div>

      {caption && (
        <p className="video-showcase__caption">{caption}</p>
      )}
    </div>
  )
}
