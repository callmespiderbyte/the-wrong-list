'use client'

import { usePathname } from 'next/navigation'

export default function PageTransition() {
  const pathname = usePathname()
  return (
    <div
      key={pathname}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        background: '#0A0A0A',
        animation: 'pageFade 0.5s ease-out forwards',
      }}
    />
  )
}
