'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import HamburgerButton from './HamburgerButton'
import MenuOverlay from './MenuOverlay'
import { Person } from '@/lib/types'

const NAV_HEIGHT = 80

interface NavBarProps {
  showLogoImmediately: boolean
  people: Person[]
  navTint?: string
}

export default function NavBar({ showLogoImmediately, people }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuContentVisible, setMenuContentVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (menuOpen) {
      const t = setTimeout(() => setMenuContentVisible(true), 280)
      return () => clearTimeout(t)
    } else {
      setMenuContentVisible(false)
    }
  }, [menuOpen])

  function handleMenuToggle() { setMenuOpen(prev => !prev) }
  function handleMenuClose() { setMenuOpen(false) }

  function handleSurpriseMe() {
    if (people.length === 0) return
    const person = people[Math.floor(Math.random() * people.length)]
    router.push(`/people/${person.id}`)
  }

  return (
    <>
      {/* Black bar — always visible, expands to full screen on mobile menu open */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: menuOpen ? '100vh' : `${NAV_HEIGHT}px`,
          backgroundColor: '#0A0A0A',
          zIndex: 58,
          transition: 'height 0.35s ease',
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
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', pointerEvents: 'auto', textDecoration: 'none' }}>
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

        {/* Centered HOME link — non-home pages only */}
        {showLogoImmediately && (
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto' }}>
            <Link href="/" className="nav-home-link">HOME</Link>
          </div>
        )}

        {/* Desktop inline nav links (hidden on mobile) */}
        <nav className="nav-desktop-links" style={{ pointerEvents: 'auto' }}>
          <Link href="/about" className="nav-inline-link">What is this?</Link>
          <Link href="/curator" className="nav-inline-link">Who made this</Link>
          <button onClick={handleSurpriseMe} className="nav-inline-btn">surprise me →</button>
        </nav>

        {/* Hamburger — mobile only */}
        <div className="nav-hamburger-wrapper" style={{ pointerEvents: 'auto' }}>
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
