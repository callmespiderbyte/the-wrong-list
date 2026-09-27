'use client'

import Link from 'next/link'
import { clearConsent } from '@/lib/consent'
import { PRIVACY_OPEN_EVENT } from '@/components/PrivacyModal'
import { IMPRESSUM_OPEN_EVENT } from '@/components/ImpressumModal'

export default function Footer() {
  function handlePrivacy(e: React.MouseEvent) {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent(PRIVACY_OPEN_EVENT))
  }

  function handleImpressum(e: React.MouseEvent) {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent(IMPRESSUM_OPEN_EVENT))
  }

  function handleManageCookies(e: React.MouseEvent) {
    e.preventDefault()
    clearConsent()
    window.location.reload()
  }

  return (
    <>
      <style>{`
        .footer-link {
          color: white;
          text-decoration: none;
          transition: text-decoration 0.15s ease;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
        .footer-meta-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-heal);
          font-size: 10px;
          letter-spacing: 0.01em;
          color: rgba(255,255,255,0.45);
          padding: 0;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .footer-meta-btn:hover {
          color: rgba(255,255,255,0.75);
        }
        @media (max-width: 600px) {
          .footer-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .footer-meta-row {
            flex-wrap: wrap !important;
          }
        }
      `}</style>
      <footer
        id="site-footer"
        style={{
          backgroundColor: '#000',
          color: '#fff',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: 'clamp(32px, 8vw, 120px)',
          paddingRight: 'clamp(32px, 8vw, 120px)',
          fontFamily: 'var(--font-heal)',
          fontSize: '12px',
          letterSpacing: '0.01em',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Primary row */}
        <div
          className="footer-inner"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '10px',
          }}
        >
          <span>© 2026 Jomiro Eming</span>
          <Link href="/nominate" className="footer-link">
            Nominate someone
          </Link>
          <Link href="/manifesto" className="footer-link">
            Manifesto
          </Link>
          <Link href="/press" className="footer-link">
            Press
          </Link>
          <a href="mailto:design@jomiro.de?subject=The%20Wrong*%20List%3A%20Contact%20request" className="footer-link">
            Contact
          </a>
        </div>

        {/* Secondary row — legal/meta */}
        <div
          className="footer-meta-row"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '6px',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          <button className="footer-meta-btn" onClick={handleImpressum}>Impressum</button>
          <span>·</span>
          <button className="footer-meta-btn" onClick={handlePrivacy}>Privacy Policy</button>
          <span>·</span>
          <button className="footer-meta-btn" onClick={handleManageCookies}>Manage Cookies</button>
          <span>·</span>
          <span>Site by Jomiro Eming</span>
        </div>
      </footer>
    </>
  )
}
