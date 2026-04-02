import Link from 'next/link'

export default function Footer() {
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
        @media (max-width: 600px) {
          .footer-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>
      <footer
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
        <div
          className="footer-inner"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span>© 2026 Jomiro Eming</span>
          <a href="mailto:design@jomiro.de?subject=Nomination%20for%20The%20Wrong*%20List" className="footer-link">
            Nominate someone
          </a>
          <a href="mailto:design@jomiro.de?subject=The%20Wrong*%20List%3A%20Contact%20request" className="footer-link">
            Contact
          </a>
        </div>
      </footer>
    </>
  )
}
