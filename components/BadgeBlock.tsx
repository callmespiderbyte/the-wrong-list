'use client'

import { useState } from 'react'

interface BadgeBlockProps {
  label: string
  src: string
  snippet: string
  previewWidth: number
  darkPreview?: boolean
}

export default function BadgeBlock({ label, src, snippet, previewWidth, darkPreview }: BadgeBlockProps) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(242, 237, 228, 0.45)',
      }}>
        {label}
      </p>

      {/* Preview */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        border: '1px solid rgba(242, 237, 228, 0.12)',
        background: darkPreview ? 'rgba(10, 10, 10, 0.7)' : 'rgba(242, 237, 228, 0.04)',
        minHeight: '88px',
        overflow: 'hidden',
      }}>
        {/* Plain img for reliable CSS sizing of pre-optimised @2x PNGs */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`The Wrong List badge — ${label}`}
          style={{ width: '100%', maxWidth: `${previewWidth}px`, height: 'auto', display: 'block' }}
        />
      </div>

      {/* Code block */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(242, 237, 228, 0.12)',
      }}>
        <pre style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          lineHeight: 1.7,
          color: 'rgba(242, 237, 228, 0.6)',
          padding: '16px',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          margin: 0,
        }}>
          {snippet}
        </pre>
        <div style={{
          borderTop: '1px solid rgba(242, 237, 228, 0.08)',
          padding: '8px 12px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px',
        }}>
          <a
            href={src}
            download
            style={{
              background: 'transparent',
              border: '1px solid rgba(242, 237, 228, 0.3)',
              color: 'rgba(242, 237, 228, 0.5)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '5px 12px',
              cursor: 'pointer',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s ease, border-color 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(242, 237, 228, 0.7)'; e.currentTarget.style.color = 'rgba(242, 237, 228, 0.9)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(242, 237, 228, 0.3)'; e.currentTarget.style.color = 'rgba(242, 237, 228, 0.5)' }}
          >
            Download
          </a>
          <button
            onClick={copy}
            style={{
              background: 'transparent',
              border: '1px solid rgba(242, 237, 228, 0.3)',
              color: copied ? 'rgba(242, 237, 228, 0.9)' : 'rgba(242, 237, 228, 0.5)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '5px 12px',
              cursor: 'pointer',
              transition: 'color 0.15s ease, border-color 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!copied) { e.currentTarget.style.borderColor = 'rgba(242, 237, 228, 0.7)'; e.currentTarget.style.color = 'rgba(242, 237, 228, 0.9)' } }}
            onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = 'rgba(242, 237, 228, 0.3)'; e.currentTarget.style.color = 'rgba(242, 237, 228, 0.5)' } }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}
