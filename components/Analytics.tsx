'use client'

import { useEffect } from 'react'
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
  gtag('config', GA_ID)
}

export default function Analytics() {
  useEffect(() => {
    if (hasConsented()) loadGA()
  }, [])

  return null
}
