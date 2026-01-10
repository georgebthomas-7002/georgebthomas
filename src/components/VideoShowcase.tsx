'use client'

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
}: VideoShowcaseProps) {
  const sizeClass = size !== 'default' ? `video-showcase--${size}` : ''

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
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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
