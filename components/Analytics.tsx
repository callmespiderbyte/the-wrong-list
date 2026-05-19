'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const GA_ID = 'G-J9JRLPD0ZN'

export default function Analytics() {
  const pathname = usePathname()
  const skipFirst = useRef(true)

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    // fire page_view on every client-side navigation after the initial load
    // (initial pageview is handled by the static gtag('config') in layout.tsx)
    const w = window as unknown as Record<string, unknown>
    if (typeof w.gtag !== 'function') return
    ;(w.gtag as (...args: unknown[]) => void)('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_ID,
    })
  }, [pathname])

  return null
}
