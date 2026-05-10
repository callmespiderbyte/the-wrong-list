'use client'

import { useState, useEffect } from 'react'

const FADE_MS = 700
const HOLD_MS = 4000

export default function TaglineBanner({ quotes }: { quotes: string[] }) {
  const [index, setIndex] = useState(0)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    let cancelled = false

    function cycle() {
      setTimeout(() => {
        if (cancelled) return
        setOpacity(0)
        setTimeout(() => {
          if (cancelled) return
          // Swap text while invisible, then wait a frame before fading in
          // so the browser paints the new text at opacity-0 before transitioning
          setIndex(i => (i + 1) % quotes.length)
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (cancelled) return
              setOpacity(1)
              cycle()
            })
          })
        }, FADE_MS + 80)
      }, HOLD_MS)
    }

    cycle()
    return () => { cancelled = true }
  }, [quotes.length])

  return (
    <div
      id="directory"
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        paddingTop: '32px',
        paddingBottom: '48px',
        paddingLeft: 'clamp(16px, 4vw, 60px)',
        paddingRight: 'clamp(16px, 4vw, 60px)',
      }}
    >
      <div
        style={{
          width: '100%',
          border: '1px solid rgba(242, 237, 228, 0.5)',
          background: 'transparent',
          minHeight: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px clamp(16px, 4vw, 48px)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heal)',
            fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
            color: 'rgba(242, 237, 228, 0.85)',
            lineHeight: 1.5,
            textAlign: 'center',
            letterSpacing: '0.01em',
            opacity,
            transition: `opacity ${FADE_MS}ms ease`,
          }}
        >
          {quotes[index]}
        </p>
      </div>
    </div>
  )
}
