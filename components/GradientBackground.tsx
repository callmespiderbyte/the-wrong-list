'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

type DominantColor = 'red' | 'teal' | 'indigo' | 'light-blue' | 'dark-blue' | 'purple'

interface GradientBackgroundProps {
  dominantColor?: DominantColor
}

const webpSources: Record<DominantColor, string> = {
  red:          '/assets/bg-red.webp',
  teal:         '/assets/bg-red.webp',
  indigo:       '/assets/bg-dark-blue.webp',
  'light-blue': '/assets/bg-dark-blue.webp',
  'dark-blue':  '/assets/bg-dark-blue.webp',
  purple:       '/assets/bg-purple.webp',
}

const MIN_BLUR_MS = 5000
const FADE_MS = 800

export default function GradientBackground({ dominantColor = 'red' }: GradientBackgroundProps) {
  const [sharp, setSharp] = useState(false)
  const loadedRef = useRef(false)
  const timerFiredRef = useRef(false)

  useEffect(() => {
    setSharp(false)
    loadedRef.current = false
    timerFiredRef.current = false

    const t = setTimeout(() => {
      timerFiredRef.current = true
      if (loadedRef.current) setSharp(true)
    }, MIN_BLUR_MS)

    return () => clearTimeout(t)
  }, [dominantColor])

  function handleLoad() {
    loadedRef.current = true
    if (timerFiredRef.current) setSharp(true)
  }

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <Image
          src={webpSources[dominantColor]}
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          onLoad={handleLoad}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: sharp ? 'blur(0px)' : 'blur(16px)',
            transform: sharp ? 'scale(1)' : 'scale(1.06)',
            transition: `filter ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
          }}
        />
      </div>
      {/* Static film grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.12,
          filter: 'url(#grain)',
          background: 'white',
        }}
      />
    </>
  )
}
