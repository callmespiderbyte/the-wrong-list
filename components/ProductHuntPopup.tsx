'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ph_popup_seen'
const GAP = 20

export default function ProductHuntPopup() {
  const [visible, setVisible] = useState(false)
  const [bottom, setBottom] = useState(GAP)

  useEffect(() => {
    if (typeof localStorage === 'undefined') return
    if (localStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    function updateBottom() {
      const footer = document.getElementById('site-footer')
      if (!footer) return
      const footerTop = footer.getBoundingClientRect().top
      const pushed = window.innerHeight - footerTop + GAP
      setBottom(pushed > GAP ? pushed : GAP)
    }
    updateBottom()
    window.addEventListener('scroll', updateBottom, { passive: true })
    window.addEventListener('resize', updateBottom, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateBottom)
      window.removeEventListener('resize', updateBottom)
    }
  }, [visible])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        .ph-popup {
          position: fixed;
          right: 20px;
          z-index: 9999;
          background: #000;
          border: 1px solid rgba(255,255,255,0.85);
          padding: 16px;
          width: 280px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: ph-slide-in 0.35s ease;
        }
        @keyframes ph-slide-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ph-popup-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .ph-popup-text {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
          flex: 1;
        }
        .ph-popup-close {
          background: none;
          border: none;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          font-size: 1rem;
          line-height: 1;
          padding: 0;
          flex-shrink: 0;
          transition: color 0.15s ease;
        }
        .ph-popup-close:hover { color: rgba(255,255,255,0.9); }
        @media (max-width: 400px) {
          .ph-popup {
            width: calc(100vw - 32px);
            right: 16px;
          }
        }
      `}</style>
      <div className="ph-popup" style={{ bottom }} role="dialog" aria-label="Product Hunt">
        <div className="ph-popup-header">
          <p className="ph-popup-text">
            We&rsquo;re on Product Hunt. If this resonates with you, an upvote would really mean the world.
          </p>
          <button className="ph-popup-close" onClick={dismiss} aria-label="Close">✕</button>
        </div>
        <a
          href="https://www.producthunt.com/products/the-wrong-list?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-the-wrong-list"
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="The Wrong List on Product Hunt"
            width={250}
            height={54}
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1142962&theme=dark&t=1778324939972"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </a>
      </div>
    </>
  )
}
