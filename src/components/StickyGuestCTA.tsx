'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function StickyGuestCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Don't show on the guest page itself
  const isGuestPage = pathname === '/guest'

  useEffect(() => {
    if (isGuestPage) return

    const handleScroll = () => {
      // Show after scrolling 60% of viewport height (roughly hero section)
      const scrollThreshold = window.innerHeight * 0.6
      setIsVisible(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isGuestPage])

  if (isGuestPage || !isVisible) return null

  return (
    <Link href="/guest" className="sticky-guest-cta">
      <div className="sticky-guest-cta__content">
        <span className="sticky-guest-cta__question">
          Have a podcast?
          <br />
          Need a Great Guest?
        </span>
        <span className="sticky-guest-cta__action">
          <svg className="sticky-guest-cta__finger" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
          Click Here
        </span>
      </div>
      <div className="sticky-guest-cta__pulse" />
    </Link>
  )
}
