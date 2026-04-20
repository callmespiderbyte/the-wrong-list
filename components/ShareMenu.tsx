'use client'

import { useState, useRef, useEffect } from 'react'
import { Person } from '@/lib/types'

const SITE_URL = 'https://thewronglist.com'

interface ShareMenuProps {
  person: Person
  cardRef: React.RefObject<HTMLDivElement>
}

export default function ShareMenu({ person, cardRef }: ShareMenuProps) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const profileUrl = `${SITE_URL}/people/${person.id}`
  const shareText = `${person.name} is on The Wrong List — ${person.quote}`

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

  async function captureCard(): Promise<Blob | null> {
    if (!cardRef.current) return null
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: '#7B0D1E',
      scale: 2,
      useCORS: true,
      logging: false,
    })
    return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'))
  }

  async function handleDownload(e: React.MouseEvent) {
    e.stopPropagation()
    setBusy(true)
    try {
      const blob = await captureCard()
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
      const blob = await captureCard()
      if (!blob) return
      const file = new File([blob], `${person.id}-wronglist.png`, { type: 'image/png' })
      const shareData: ShareData = {
        title: `${person.name} on The Wrong List`,
        text: shareText,
        url: profileUrl,
        files: [file],
      }
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback: share without the file
        await navigator.share({ title: shareData.title, text: shareData.text, url: shareData.url })
      }
    } catch {
      // user cancelled or unsupported — silently ignore
    } finally {
      setBusy(false)
      setOpen(false)
    }
  }

  function openShareUrl(url: string, e: React.MouseEvent) {
    e.stopPropagation()
    window.open(url, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`
  const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${shareText} ${profileUrl}`)}`

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share

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
          <button type="button" className="share-item" onClick={handleDownload} disabled={busy}>
            {busy ? 'preparing…' : 'save card image'}
          </button>
          {hasNativeShare && (
            <button type="button" className="share-item" onClick={handleNativeShare} disabled={busy}>
              {busy ? 'preparing…' : 'share…'}
            </button>
          )}
          <div className="share-divider" />
          <button type="button" className="share-item" onClick={(e) => openShareUrl(xUrl, e)}>
            share on X
          </button>
          <button type="button" className="share-item" onClick={(e) => openShareUrl(linkedinUrl, e)}>
            share on LinkedIn
          </button>
          <button type="button" className="share-item" onClick={(e) => openShareUrl(blueskyUrl, e)}>
            share on Bluesky
          </button>
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
