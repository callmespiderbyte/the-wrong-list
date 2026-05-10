import type { Metadata } from 'next'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import GradientBackground from '@/components/GradientBackground'
import BadgeBlock from '@/components/BadgeBlock'

export const metadata: Metadata = {
  title: 'Member Kit — The Wrong List',
  description: 'Badge assets and embed codes for Wrong List members.',
  alternates: { canonical: '/kit' },
}

const BASE = 'https://thewronglist.com'

const horizontalSnippet = (variant: string) =>
  `<a href="${BASE}" target="_blank" rel="noopener">\n  <img src="${BASE}/badges/wrong-list-badge-horizontal-${variant}_2x.png"\n       alt="Featured on The Wrong List"\n       width="288" />\n</a>`

const squareSnippet = (variant: string) =>
  `<a href="${BASE}" target="_blank" rel="noopener">\n  <img src="${BASE}/badges/wrong-list-badge-square-${variant}_2x.png"\n       alt="Featured on The Wrong List"\n       width="96" />\n</a>`

const HORIZONTAL = [
  { label: 'Colour', variant: 'colour', darkPreview: false },
  { label: 'Dark',   variant: 'dark',   darkPreview: false },
  { label: 'Light',  variant: 'light',  darkPreview: false },
]

const SQUARE = [
  { label: 'Colour', variant: 'colour', darkPreview: false },
  { label: 'Dark',   variant: 'dark',   darkPreview: false },
  { label: 'Light',  variant: 'light',  darkPreview: false },
]

export default function KitPage() {
  const people = getPeople()

  return (
    <>
      <GradientBackground dominantColor="dark-blue" />
      <NavBar showLogoImmediately={true} navTint="dark-blue" people={people} />

      <main style={{
        minHeight: '100vh',
        paddingLeft: 'clamp(32px, 8vw, 120px)',
        paddingRight: 'clamp(32px, 8vw, 120px)',
        paddingTop: '160px',
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>

          {/* Header */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(242, 237, 228, 0.5)',
            marginBottom: '12px',
          }}>
            For members
          </p>

          <h1 style={{
            fontFamily: 'var(--font-heal)',
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            fontWeight: 400,
            color: 'var(--off-white)',
            lineHeight: 1.05,
            marginBottom: '24px',
          }}>
            Member Kit
          </h1>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: 'rgba(242, 237, 228, 0.75)',
            lineHeight: 1.8,
            marginBottom: '64px',
            maxWidth: '560px',
          }}>
            You&rsquo;re on the list. Here&rsquo;s how to show it. Pick a badge, copy the code, paste it anywhere on your site.
          </p>

          {/* Horizontal section */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(242, 237, 228, 0.65)',
            marginBottom: '20px',
          }}>
            Horizontal
          </p>

          <div className="kit-grid" style={{ marginBottom: '56px' }}>
            {HORIZONTAL.map(({ label, variant, darkPreview }) => (
              <BadgeBlock
                key={variant}
                label={label}
                src={`/badges/wrong-list-badge-horizontal-${variant}_2x.png`}
                snippet={horizontalSnippet(variant)}
                previewWidth={288}
                darkPreview={darkPreview}
              />
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(242, 237, 228, 0.12)', margin: '0 0 56px' }} />

          {/* Square section */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(242, 237, 228, 0.65)',
            marginBottom: '20px',
          }}>
            Square
          </p>

          <div className="kit-grid">
            {SQUARE.map(({ label, variant, darkPreview }) => (
              <BadgeBlock
                key={variant}
                label={label}
                src={`/badges/wrong-list-badge-square-${variant}_2x.png`}
                snippet={squareSnippet(variant)}
                previewWidth={96}
                darkPreview={darkPreview}
              />
            ))}
          </div>

        </div>
      </main>
    </>
  )
}
