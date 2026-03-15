'use client'

import { useEffect, useState } from 'react'

/**
 * Fades in a dark overlay as the user scrolls down on the home page.
 * The threshold (when dimming starts) is later on desktop than on mobile,
 * so the hero image stays bright but the directory text becomes more legible.
 *
 * Desktop (≥ 768px): starts fading after 65% of viewport height scrolled
 * Mobile  (< 768px): starts fading after 30% of viewport height scrolled
 * Fully opaque (0.25) after: threshold + 40% viewport height
 */
export default function ScrollDimmer() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const isDesktop = window.innerWidth >= 768

      const start = vh * (isDesktop ? 0.20 : 0.30)
      const end   = start + vh * 0.40

      const raw = (scrollY - start) / (end - start)
      const clamped = Math.min(1, Math.max(0, raw))
      setOpacity(clamped * 0.45)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run once on mount in case page is already scrolled
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (opacity === 0) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        background: `rgba(0, 0, 0, ${opacity})`,
        pointerEvents: 'none',
        transition: 'background 0.1s linear',
      }}
    />
  )
}
