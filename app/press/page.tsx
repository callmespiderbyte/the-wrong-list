import type { Metadata } from 'next'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import GradientBackground from '@/components/GradientBackground'

export const metadata: Metadata = {
  title: 'Press — The Wrong List',
  description: 'For editorial enquiries, interview requests, and media use.',
}

export default function PressPage() {
  const people = getPeople()

  return (
    <>
      <style>{`
        .press-dl-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: var(--off-white);
          border: 1px solid rgba(242, 237, 228, 0.5);
          padding: 12px 20px;
          text-decoration: none;
          transition: border-color 0.15s ease;
          width: fit-content;
        }
        .press-dl-primary:hover { border-color: rgba(242, 237, 228, 1); }
        .press-dl-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: rgba(242, 237, 228, 0.65);
          border: 1px solid rgba(242, 237, 228, 0.25);
          padding: 12px 20px;
          text-decoration: none;
          transition: border-color 0.15s ease, color 0.15s ease;
          width: fit-content;
        }
        .press-dl-secondary:hover {
          border-color: rgba(242, 237, 228, 0.6);
          color: rgba(242, 237, 228, 0.9);
        }
      `}</style>
      <GradientBackground dominantColor="dark-blue" />
      <NavBar showLogoImmediately={true} navTint="dark-blue" people={people} />

      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 'clamp(32px, 8vw, 120px)',
          paddingRight: 'clamp(32px, 8vw, 120px)',
          paddingTop: '160px',
          paddingBottom: '80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: '600px' }}>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(242, 237, 228, 0.5)',
              marginBottom: '12px',
            }}
          >
            For editorial enquiries, interview requests, and media use.
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-heal)',
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              fontWeight: 400,
              color: 'var(--off-white)',
              lineHeight: 1.05,
              marginBottom: '48px',
            }}
          >
            Press
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}
          >
            The Wrong* List is an invite-only web directory of unconventional professionals who were told they were too different, too hard to place, or simply doing it wrong. It launches 21 May 2026. Free to browse. Nomination-based to join. 16 founding members across 9 countries.
          </p>

          {/* Key facts */}
          <div style={{ marginBottom: '48px' }}>
            {[
              ['Format', 'Invite-only web directory with private member community'],
              ['Access', 'Free to browse, nomination-based to join'],
              ['Founding cohort', '16 members across 9 countries'],
              ['Launch date', '21 May 2026'],
              ['Tagline', 'Wrong by most standards, right by the ones that matter.'],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  borderTop: '1px solid rgba(242, 237, 228, 0.15)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(242, 237, 228, 0.45)',
                    paddingTop: '2px',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'rgba(242, 237, 228, 0.85)',
                    lineHeight: 1.6,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
            <div style={{ borderBottom: '1px solid rgba(242, 237, 228, 0.15)' }} />
          </div>

          {/* Quote */}
          <blockquote
            style={{
              borderLeft: '2px solid rgba(242, 237, 228, 0.3)',
              paddingLeft: '20px',
              marginBottom: '48px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'rgba(242, 237, 228, 0.75)',
                lineHeight: 1.8,
                marginBottom: '10px',
                fontStyle: 'italic',
              }}
            >
              &ldquo;I built this because I wished it had existed when I was finding my own footing. My network is full of people who were told they were too much, too different, too hard to categorise. This is a place for them.&rdquo;
            </p>
            <cite
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(242, 237, 228, 0.45)',
                letterSpacing: '0.05em',
                fontStyle: 'normal',
              }}
            >
              &mdash; Jomiro Eming, curator
            </cite>
          </blockquote>

          {/* Downloads */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            <a href="/press/TheWrongList_PressKit.pdf" download className="press-dl-primary">
              <DownloadIcon />
              Download press kit
            </a>
            <a href="/press/TheWrongList_Logos.zip" download className="press-dl-secondary">
              <DownloadIcon />
              Download logo assets
            </a>
          </div>

          {/* Contact */}
          <div style={{ borderTop: '1px solid rgba(242, 237, 228, 0.15)', paddingTop: '24px' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(242, 237, 228, 0.4)',
                marginBottom: '12px',
              }}
            >
              Contact
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'rgba(242, 237, 228, 0.75)',
                lineHeight: 2,
              }}
            >
              Press enquiries:{' '}
              <a
                href="mailto:design@jomiro.de"
                style={{ color: 'var(--off-white)', textDecoration: 'underline' }}
              >
                design@jomiro.de
              </a>
              <br />
              Curator on LinkedIn:{' '}
              <a
                href="https://linkedin.com/in/jomiroeming"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--off-white)', textDecoration: 'underline' }}
              >
                linkedin.com/in/jomiroeming
              </a>
            </p>
          </div>

        </div>
      </main>
    </>
  )
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
