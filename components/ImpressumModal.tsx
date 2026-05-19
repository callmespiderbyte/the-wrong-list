'use client'

import { useEffect, useState, useCallback } from 'react'

export const IMPRESSUM_OPEN_EVENT = 'twl:open-impressum'

export default function ImpressumModal() {
  const [open, setOpen] = useState(false)

  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  useEffect(() => {
    window.addEventListener(IMPRESSUM_OPEN_EVENT, openModal)
    return () => window.removeEventListener(IMPRESSUM_OPEN_EVENT, openModal)
  }, [openModal])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, closeModal])

  if (!open) return null

  return (
    <>
      <style>{`
        .privacy-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.82);
          z-index: 9500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .privacy-modal-panel {
          background: #000;
          border: 1px solid rgba(255,255,255,0.85);
          max-width: 640px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          padding: 40px 40px 48px;
          position: relative;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.85);
        }
        .privacy-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          font-size: 1.1rem;
          line-height: 1;
          padding: 4px;
          transition: color 0.15s ease;
        }
        .privacy-modal-close:hover { color: rgba(255,255,255,0.9); }
        .privacy-modal-title {
          font-family: var(--font-heal);
          font-size: 1.1rem;
          letter-spacing: 0.02em;
          color: #fff;
          margin-bottom: 24px;
        }
        .privacy-modal-panel h2 {
          font-family: var(--font-heal);
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          color: #fff;
          margin-top: 24px;
          margin-bottom: 8px;
        }
        .privacy-modal-panel p {
          margin-bottom: 12px;
        }
        .privacy-modal-panel a {
          color: #fff;
          text-underline-offset: 2px;
        }
        @media (max-width: 600px) {
          .privacy-modal-panel {
            padding: 32px 24px 40px;
          }
        }
      `}</style>
      <div
        className="privacy-modal-backdrop"
        onClick={closeModal}
        role="dialog"
        aria-modal="true"
        aria-label="Impressum"
      >
        <div
          className="privacy-modal-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="privacy-modal-close" onClick={closeModal} aria-label="Close impressum">✕</button>

          <p className="privacy-modal-title">Impressum</p>

          <p>Angaben gemäß § 5 TMG / In accordance with § 5 TMG</p>

          <p>
            Jomiro Eming<br />
            Friedensallee 62<br />
            22765 Hamburg<br />
            Germany
          </p>

          <p>
            Email: <a href="mailto:design@jomiro.de">design@jomiro.de</a><br />
            Phone: <a href="tel:+4915140384957">+49 151 40384957</a>
          </p>
        </div>
      </div>
    </>
  )
}
