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
        animation: 'pageWipe 0.55s cubic-bezier(0.76, 0, 0.24, 1) forwards',
      }}
    />
  )
}
