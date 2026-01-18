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
          <span className="sticky-guest-cta__finger">👉</span>
          Click Here
        </span>
      </div>
      <div className="sticky-guest-cta__pulse" />
    </Link>
  )
}
