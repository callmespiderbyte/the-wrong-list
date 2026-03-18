'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HamburgerButton from './HamburgerButton'
import MenuOverlay from './MenuOverlay'
import { Person } from '@/lib/types'

const NAV_HEIGHT = 80

interface NavBarProps {
  showLogoImmediately: boolean
  people: Person[]
  navTint?: string // kept for prop-compatibility, no longer used
}

export default function NavBar({ showLogoImmediately, people }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuContentVisible, setMenuContentVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll-triggered bar visibility — appears on scroll, hides when back at top
  useEffect(() => {
    setScrolled(false)
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Delay menu content until the black bar has expanded
  useEffect(() => {
    if (menuOpen) {
      const t = setTimeout(() => setMenuContentVisible(true), 280)
      return () => clearTimeout(t)
    } else {
      setMenuContentVisible(false)
    }
  }, [menuOpen])

  function handleMenuToggle() {
    setMenuOpen((prev) => !prev)
  }

  function handleMenuClose() {
    setMenuOpen(false)
  }

  return (
    <>
      {/* Black bar — fades in on scroll, expands to full screen when menu opens */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: menuOpen ? '100vh' : `${NAV_HEIGHT}px`,
          backgroundColor: '#0A0A0A',
          zIndex: 58,
          opacity: scrolled || menuOpen ? 1 : 0,
          transition: 'height 0.35s ease, opacity 0.4s ease',
        }}
      />

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${NAV_HEIGHT}px`,
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 0 0 24px',
          pointerEvents: 'none',
        }}
      >
        {/* Logo lockup */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'auto',
            textDecoration: 'none',
          }}
        >
          <Image
            src="/assets/brandmark.svg"
            alt="The Wrong List"
            width={517}
            height={256}
            className="nav-brandmark"
            style={{ width: 'auto' }}
            priority
          />
        </Link>

        {/* Centered HOME link — shown on all non-home pages */}
        {showLogoImmediately && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'auto',
            }}
          >
            <Link href="/" className="nav-home-link">
              HOME
            </Link>
          </div>
        )}

        {/* Hamburger — always interactive, flush right */}
        <div style={{ pointerEvents: 'auto' }}>
          <HamburgerButton isOpen={menuOpen} onClick={handleMenuToggle} />
        </div>
      </header>

      <MenuOverlay
        isOpen={menuOpen}
        contentVisible={menuContentVisible}
        onClose={handleMenuClose}
        people={people}
        navHeight={NAV_HEIGHT}
      />
    </>
  )
}
