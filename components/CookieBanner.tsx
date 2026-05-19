'use client'

import { useEffect, useState } from 'react'
import { getConsent, setConsent } from '@/lib/consent'
import { loadGA } from '@/components/Analytics'
import { PRIVACY_OPEN_EVENT } from '@/components/PrivacyModal'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getConsent() === null) setVisible(true)
  }, [])

  function handleAccept() {
    setConsent('accepted')
    loadGA()
    setVisible(false)
  }

  function handleDecline() {
    setConsent('declined')
    setVisible(false)
  }

  function openPrivacy(e: React.MouseEvent) {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent(PRIVACY_OPEN_EVENT))
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        .cookie-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.78);
          z-index: 9100;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cookie-shape {
          position: relative;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: #000;
          border: 1px solid rgba(255,255,255,0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 52px 44px;
          text-align: center;
          gap: 0;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 60px rgba(255,255,255,0.03);
        }
        /* decorative chip dots */
        .cookie-shape::before,
        .cookie-shape::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
        }
        .cookie-shape::before {
          width: 8px; height: 8px;
          top: 72px; left: 88px;
        }
        .cookie-shape::after {
          width: 6px; height: 6px;
          bottom: 80px; right: 82px;
        }
        .cookie-text {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.8);
          margin-bottom: 20px;
        }
        .cookie-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
        }
        .cookie-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.6);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: lowercase;
          padding: 7px 16px;
          cursor: pointer;
          transition: background-color 0.15s ease, border-color 0.15s ease;
          border-radius: 0;
        }
        .cookie-btn:hover {
          background-color: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.9);
        }
        .cookie-btn-accept {
          background: rgba(255,255,255,0.08);
        }
        .cookie-privacy-link {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(255,255,255,0.4);
          text-decoration: underline;
          text-underline-offset: 2px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s ease;
        }
        .cookie-privacy-link:hover {
          color: rgba(255,255,255,0.75);
        }
        @media (max-width: 380px) {
          .cookie-shape {
            width: 290px;
            height: 290px;
            padding: 48px 36px;
          }
        }
      `}</style>
      <div className="cookie-overlay" role="dialog" aria-modal="true" aria-label="Cookie consent">
        <div className="cookie-shape">
          <p className="cookie-text">
            This site uses minimal analytics to understand how people find it. No ads, no tracking sold to third parties.
          </p>
          <div className="cookie-buttons">
            <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>Accept</button>
            <button className="cookie-btn" onClick={handleDecline}>Decline</button>
          </div>
          <button className="cookie-privacy-link" onClick={openPrivacy}>Privacy Policy</button>
        </div>
      </div>
    </>
  )
}
