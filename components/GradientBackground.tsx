'use client'

import Image from 'next/image'

type DominantColor = 'red' | 'teal' | 'indigo' | 'light-blue' | 'dark-blue' | 'purple'

interface GradientBackgroundProps {
  dominantColor?: DominantColor
}

// Maps each color key to its background image file in /public/assets/
const backgroundImages: Record<DominantColor, string> = {
  red:          '/assets/bg-red.webp',
  teal:         '/assets/bg-red.webp',       // legacy fallback
  indigo:       '/assets/bg-dark-blue.webp', // legacy fallback
  'light-blue': '/assets/bg-dark-blue.webp', // fallback — no light-blue asset
  'dark-blue':  '/assets/bg-dark-blue.webp',
  'purple':     '/assets/bg-purple.webp',
}

export default function GradientBackground({
  dominantColor = 'red',
}: GradientBackgroundProps) {
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <Image
          src={backgroundImages[dominantColor]}
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      {/* Static film grain overlay (no mix-blend-mode for Safari perf) */}
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
