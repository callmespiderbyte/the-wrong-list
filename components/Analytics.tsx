'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { hasConsented } from '@/lib/consent'

const GA_ID = 'G-J9JRLPD0ZN'

export function loadGA() {
  if (typeof window === 'undefined') return
  const w = window as unknown as Record<string, unknown>
  if (w.gaLoaded) return
  w.gaLoaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  w.dataLayer = w.dataLayer || []
  function gtag(...args: unknown[]) {
    ;(w.dataLayer as unknown[]).push(args)
  }
  w.gtag = gtag
  gtag('js', new Date())
  // fires the initial page_view
  gtag('config', GA_ID)
}

function trackPageview(path: string) {
  const w = window as unknown as Record<string, unknown>
  if (!w.gaLoaded || typeof w.gtag !== 'function') return
  ;(w.gtag as (...args: unknown[]) => void)('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export default function Analytics() {
  const pathname = usePathname()
  const initialised = useRef(false)

  useEffect(() => {
    if (hasConsented()) loadGA()
    initialised.current = true
  }, [])

  // fire on every client-side navigation after the initial load
  useEffect(() => {
    if (!initialised.current) return
    if (hasConsented()) trackPageview(pathname)
  }, [pathname])

  return null
}
