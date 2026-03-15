'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HamburgerButton from './HamburgerButton'
import MenuOverlay from './MenuOverlay'
import { Person } from '@/lib/types'

interface NavBarProps {
  showLogoImmediately: boolean
  people: Person[]
}

export default function NavBar({ showLogoImmediately, people }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoVisible, setLogoVisible] = useState(showLogoImmediately)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      if (!showLogoImmediately) {
        const threshold = window.innerHeight * 0.8
        setLogoVisible(y > threshold)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showLogoImmediately])

  function handleMenuToggle() {
    setMenuOpen((prev) => !prev)
  }

  function handleMenuClose() {
    setMenuOpen(false)
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0 16px 24px',
          background: scrolled ? 'rgba(0, 0, 0, 0.65)' : 'transparent',
          transition: 'background 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        {/* Logo lockup */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            pointerEvents: logoVisible ? 'auto' : 'none',
            opacity: logoVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
            textDecoration: 'none',
          }}
        >
          <Image
            src="/assets/brandmark.svg"
            alt="The Wrong List"
            width={517}
            height={256}
            style={{ height: '36px', width: 'auto' }}
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

      <MenuOverlay isOpen={menuOpen} onClose={handleMenuClose} people={people} />
    </>
  )
}
