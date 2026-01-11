'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHeaderScroll } from '@/lib/useScrollAnimation'

const navLinks = [
  { href: '/expertise', label: 'Expertise' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/coaching', label: 'Coaching' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function Header() {
  const isScrolled = useHeaderScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstFocusableRef = useRef<HTMLAnchorElement>(null)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  // Body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen, closeMenu])

  // Focus trap within menu
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isMenuOpen])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen, closeMenu])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
        <div className="container">
        <div className="header__inner">
          <Link href="/" className="header__logo">
            <span className="header__wordmark">
              <span className="header__wordmark-name">George B. Thomas</span>
              <span className="header__wordmark-tagline">Catalyst for Growth</span>
            </span>
          </Link>

          {/* Backdrop overlay for mobile menu */}
          <div
            className={`header__backdrop ${isMenuOpen ? 'is-open' : ''}`}
            onClick={closeMenu}
            aria-hidden="true"
          />

          <nav
            ref={menuRef}
            className={`header__nav ${isMenuOpen ? 'is-open' : ''}`}
            aria-label="Main navigation"
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                ref={index === 0 ? firstFocusableRef : undefined}
                className={`header__nav-link ${pathname === link.href ? 'is-active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/coaching" className="btn btn--primary btn--small" onClick={closeMenu}>
              Book George
            </Link>
          </nav>

          <button
            ref={menuButtonRef}
            className={`header__menu-btn ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      </header>
    </>
  )
}
