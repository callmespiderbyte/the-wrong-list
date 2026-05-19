'use client'

import { useEffect, useState } from 'react'
import { getConsent, setConsent } from '@/lib/consent'
import { PRIVACY_OPEN_EVENT } from '@/components/PrivacyModal'

function CookieIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      {/* cookie body */}
      <circle cx="22" cy="22" r="19" fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="1.5" />
      {/* chips */}
      <ellipse cx="15" cy="15" rx="3" ry="2.2" fill="white" opacity="0.75" transform="rotate(-20 15 15)" />
      <ellipse cx="28" cy="13" rx="2.4" ry="1.8" fill="white" opacity="0.75" transform="rotate(15 28 13)" />
      <ellipse cx="13" cy="27" rx="2.2" ry="2.8" fill="white" opacity="0.75" transform="rotate(-10 13 27)" />
      <ellipse cx="28" cy="28" rx="3" ry="2" fill="white" opacity="0.75" transform="rotate(25 28 28)" />
      <ellipse cx="22" cy="21" rx="2" ry="1.5" fill="white" opacity="0.75" transform="rotate(-5 22 21)" />
      <ellipse cx="20" cy="31" rx="1.8" ry="1.4" fill="white" opacity="0.75" transform="rotate(10 20 31)" />
      {/* subtle crack */}
      <path d="M25 10 Q27 14 25 17" stroke="white" strokeWidth="0.7" strokeLinecap="round" opacity="0.25" />
    </svg>
  )
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getConsent() === null) setVisible(true)
  }, [])

  function handleAccept() {
    setConsent('accepted')
    const w = window as unknown as Record<string, unknown>
    if (typeof w.gtag === 'function') {
      ;(w.gtag as (...args: unknown[]) => void)('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
    }
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
          padding: 24px;
        }
        .cookie-box {
          background: #000;
          border: 1px solid rgba(255,255,255,0.85);
          width: 100%;
          max-width: 360px;
          padding: 28px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .cookie-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 16px;
        }
        .cookie-text {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.8);
          flex: 1;
          padding-top: 2px;
        }
        .cookie-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
          justify-content: center;
        }
        .cookie-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.6);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: lowercase;
          padding: 7px 20px;
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
          align-self: center;
        }
        .cookie-privacy-link:hover {
          color: rgba(255,255,255,0.75);
        }
      `}</style>
      <div className="cookie-overlay" role="dialog" aria-modal="true" aria-label="Cookie consent">
        <div className="cookie-box">
          <div className="cookie-header">
            <CookieIcon />
            <p className="cookie-text">
              This site uses minimal analytics to understand how people find it. No ads, no tracking sold to third parties.
            </p>
          </div>
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
