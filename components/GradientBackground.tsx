'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

type DominantColor = 'red' | 'teal' | 'indigo' | 'light-blue' | 'dark-blue' | 'purple'

interface GradientBackgroundProps {
  dominantColor?: DominantColor
}

const pngSources: Record<DominantColor, string> = {
  red:          '/assets/bg-red.png',
  teal:         '/assets/bg-red.png',
  indigo:       '/assets/bg-dark-blue.png',
  'light-blue': '/assets/bg-dark-blue.png',
  'dark-blue':  '/assets/bg-dark-blue.png',
  purple:       '/assets/bg-purple.png',
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
  const [showSharp, setShowSharp] = useState(false)
  const webpLoadedRef = useRef(false)
  const timerFiredRef = useRef(false)

  useEffect(() => {
    setShowSharp(false)
    webpLoadedRef.current = false
    timerFiredRef.current = false

    const t = setTimeout(() => {
      timerFiredRef.current = true
      if (webpLoadedRef.current) setShowSharp(true)
    }, MIN_BLUR_MS)

    return () => clearTimeout(t)
  }, [dominantColor])

  function handleWebpLoad() {
    webpLoadedRef.current = true
    if (timerFiredRef.current) setShowSharp(true)
  }

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {/* PNG — loads fast, intentionally blurred as placeholder */}
        <Image
          src={pngSources[dominantColor]}
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'blur(12px)',
            transform: 'scale(1.06)',
          }}
        />
        {/* WebP — fades in once loaded and MIN_BLUR_MS has elapsed */}
        <Image
          src={webpSources[dominantColor]}
          alt=""
          fill
          quality={85}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: showSharp ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease`,
          }}
          onLoad={handleWebpLoad}
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
