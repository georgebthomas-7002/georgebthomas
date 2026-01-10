'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHeaderScroll } from '@/lib/useScrollAnimation'

const navLinks = [
  { href: '/expertise', label: 'Expertise' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/coaching', label: 'Coaching' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function Header() {
  const isScrolled = useHeaderScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__inner">
          <Link href="/" className="header__logo">
            <span className="header__wordmark">
              <span className="header__wordmark-name">George B. Thomas</span>
              <span className="header__wordmark-tagline">Catalyst for Growth</span>
            </span>
          </Link>

          <nav className={`header__nav ${isMenuOpen ? 'is-open' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`header__nav-link ${pathname === link.href ? 'is-active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/coaching" className="btn btn--primary" onClick={() => setIsMenuOpen(false)}>
              Book George
            </Link>
          </nav>

          <button
            className="header__menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
