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

export default function GradientBackground({ dominantColor = 'red' }: GradientBackgroundProps) {
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
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
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
