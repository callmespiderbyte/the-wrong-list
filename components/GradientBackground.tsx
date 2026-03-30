'use client'

type DominantColor = 'red' | 'teal' | 'indigo' | 'light-blue' | 'dark-blue' | 'purple'

interface GradientBackgroundProps {
  dominantColor?: DominantColor
}

// Maps each color key to its background image file in /public/assets/
const backgroundImages: Record<DominantColor, string> = {
  red:          '/assets/bg-red.png',
  teal:         '/assets/bg-red.png',       // legacy fallback
  indigo:       '/assets/bg-dark-blue.png', // legacy fallback
  'light-blue': '/assets/bg-light-blue.png',
  'dark-blue':  '/assets/bg-dark-blue.png',
  'purple':     '/assets/bg-purple.png',
}

export default function GradientBackground({
  dominantColor = 'red',
}: GradientBackgroundProps) {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${backgroundImages[dominantColor]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Animated film grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.07,
          mixBlendMode: 'overlay',
          filter: 'url(#grain)',
          background: 'white',
        }}
      />
    </>
  )
}
