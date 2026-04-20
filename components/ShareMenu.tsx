'use client'

import { useState, useRef, useEffect } from 'react'
import { Person } from '@/lib/types'

const SITE_URL = 'https://thewronglist.com'

interface ShareMenuProps {
  person: Person
}

export default function ShareMenu({ person }: ShareMenuProps) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [hasCard, setHasCard] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const profileUrl = `${SITE_URL}/people/${person.id}`
  const cardUrl = `/share-cards/${person.id}.png`

  // Probe for a pre-generated share card; gracefully degrade to URL-only sharing
  // if it's missing (e.g., new profile not yet shot).
  useEffect(() => {
    let cancelled = false
    fetch(cardUrl, { method: 'HEAD' })
      .then((r) => { if (!cancelled) setHasCard(r.ok) })
      .catch(() => { if (!cancelled) setHasCard(false) })
    return () => { cancelled = true }
  }, [cardUrl])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  async function fetchCardBlob(): Promise<Blob | null> {
    try {
      const res = await fetch(cardUrl)
      if (!res.ok) return null
      return await res.blob()
    } catch {
      return null
    }
  }

  async function handleDownload(e: React.MouseEvent) {
    e.stopPropagation()
    setBusy(true)
    try {
      const blob = await fetchCardBlob()
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${person.id}-wronglist.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } finally {
      setBusy(false)
      setOpen(false)
    }
  }

  async function handleNativeShare(e: React.MouseEvent) {
    e.stopPropagation()
    setBusy(true)
    try {
      const baseData: ShareData = {
        title: `${person.name} on The Wrong List`,
        url: profileUrl,
      }

      if (hasCard) {
        const blob = await fetchCardBlob()
        if (blob) {
          const file = new File([blob], `${person.id}-wronglist.png`, { type: 'image/png' })
          const withFile: ShareData = { ...baseData, files: [file] }
          if (navigator.canShare && navigator.canShare(withFile)) {
            await navigator.share(withFile)
            return
          }
        }
      }

      await navigator.share(baseData)
    } catch {
      // user cancelled or unsupported — silently ignore
    } finally {
      setBusy(false)
      setOpen(false)
    }
  }

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share

  // Nothing to offer — hide the share button entirely
  if (!hasCard && !hasNativeShare) return null

  return (
    <div ref={menuRef} className="share-menu-wrapper">
      <button
        type="button"
        className="share-btn"
        aria-label="Share this profile"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
      >
        <ShareIcon />
      </button>

      {open && (
        <div className="share-popover" onClick={(e) => e.stopPropagation()}>
          {hasCard && (
            <button type="button" className="share-item" onClick={handleDownload} disabled={busy}>
              {busy ? 'preparing…' : 'save card image'}
            </button>
          )}
          {hasNativeShare && (
            <button type="button" className="share-item" onClick={handleNativeShare} disabled={busy}>
              {busy ? 'preparing…' : 'share…'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}
