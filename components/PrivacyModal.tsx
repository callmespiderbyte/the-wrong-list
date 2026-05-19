'use client'

import { useEffect, useState, useCallback } from 'react'

export const PRIVACY_OPEN_EVENT = 'twl:open-privacy'

export default function PrivacyModal() {
  const [open, setOpen] = useState(false)

  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  useEffect(() => {
    window.addEventListener(PRIVACY_OPEN_EVENT, openModal)
    return () => window.removeEventListener(PRIVACY_OPEN_EVENT, openModal)
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
        aria-label="Privacy Policy"
      >
        <div
          className="privacy-modal-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="privacy-modal-close" onClick={closeModal} aria-label="Close privacy policy">✕</button>

          <p className="privacy-modal-title">Privacy Policy</p>

          <p>Last updated: May 2026</p>

          <h2>Who we are</h2>
          <p>
            The Wrong List (thewronglist.com) is operated by Jomiro Eming, a freelance graphic designer and creative strategist based in Hamburg, Germany. Contact: <a href="mailto:design@jomiro.de">design@jomiro.de</a>
          </p>

          <h2>What data we collect</h2>
          <p>
            If you accept analytics cookies, we use Google Analytics 4 (GA4) to collect anonymised usage data — pages visited, approximate location (country/region), device type, and referral source. This data helps us understand how people find and use the site.
          </p>
          <p>
            We do not collect names, email addresses, or any personally identifiable information through analytics.
          </p>

          <h2>Why we collect it</h2>
          <p>
            Analytics data is used solely to understand how visitors discover and navigate the site. It is never sold, shared with advertisers, or used for targeted advertising.
          </p>

          <h2>Legal basis (GDPR)</h2>
          <p>
            Analytics cookies are only set after you give explicit consent (Article 6(1)(a) GDPR). You may withdraw consent at any time using the &ldquo;Manage cookies&rdquo; link in the site footer.
          </p>

          <h2>Third-party services</h2>
          <p>
            We use Google Analytics 4, operated by Google Ireland Limited. Google may process data in the United States under Standard Contractual Clauses. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&rsquo;s Privacy Policy</a> for details.
          </p>

          <h2>Cookies</h2>
          <p>
            We set one first-party cookie (<code>twl_cookie_consent</code>) to remember your consent choice for 365 days. If you accept analytics, Google Analytics sets its own cookies (_ga, _ga_*) for session tracking.
          </p>

          <h2>Your rights</h2>
          <p>
            Under GDPR you have the right to access, rectify, or erase personal data we hold. As we collect no personally identifiable data beyond what Google Analytics processes, requests should be directed to <a href="mailto:design@jomiro.de">design@jomiro.de</a>.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy occasionally. The &ldquo;Last updated&rdquo; date will reflect any changes.
          </p>
        </div>
      </div>
    </>
  )
}
