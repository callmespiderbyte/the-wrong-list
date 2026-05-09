'use client'

import { useState, useEffect } from 'react'

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const TICK = 40
const IN_MS = 900
const HOLD_MS = 4000
const OUT_MS = 650

function isLetter(c: string) { return /[a-zA-Z]/.test(c) }

function scramble(c: string) {
  if (!isLetter(c)) return c
  return c === c.toUpperCase()
    ? UPPER[Math.floor(Math.random() * UPPER.length)]
    : LOWER[Math.floor(Math.random() * LOWER.length)]
}

function fullyScrambled(text: string) {
  return text.split('').map(scramble).join('')
}

export default function TaglineBanner({ quotes }: { quotes: string[] }) {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState(() => fullyScrambled(quotes[0]))

  useEffect(() => {
    const text = quotes[index]
    const letterCount = text.split('').filter(isLetter).length
    let timer: ReturnType<typeof setTimeout>
    let cancelled = false

    const inStart = Date.now()

    function tickIn() {
      if (cancelled) return
      const progress = Math.min((Date.now() - inStart) / IN_MS, 1)
      let seen = 0
      const result = text.split('').map(c => {
        if (!isLetter(c)) return c
        seen++
        return progress >= seen / letterCount ? c : scramble(c)
      }).join('')
      setDisplay(result)
      if (progress < 1) { timer = setTimeout(tickIn, TICK) }
      else { setDisplay(text); timer = setTimeout(startOut, HOLD_MS) }
    }

    function startOut() {
      if (cancelled) return
      const outStart = Date.now()
      function tickOut() {
        if (cancelled) return
        const progress = Math.min((Date.now() - outStart) / OUT_MS, 1)
        let seen = 0
        const result = text.split('').map(c => {
          if (!isLetter(c)) return c
          seen++
          // unravel right-to-left
          return progress >= 1 - seen / letterCount ? scramble(c) : c
        }).join('')
        setDisplay(result)
        if (progress < 1) { timer = setTimeout(tickOut, TICK) }
        else { setIndex(i => (i + 1) % quotes.length) }
      }
      tickOut()
    }

    tickIn()
    return () => { cancelled = true; clearTimeout(timer) }
  }, [index, quotes])

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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '36px 48px',
          minHeight: '120px',
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
          }}
        >
          {display}
        </p>
      </div>
    </div>
  )
}
