import { Person } from '@/lib/types'
import GradientBackground from './GradientBackground'
import NavBar from './NavBar'
import PolaroidPhoto from './PolaroidPhoto'
import { getPeople } from '@/lib/people'

interface ProfilePageProps {
  person: Person
  reversed?: boolean
}

export default function ProfilePage({ person, reversed = false }: ProfilePageProps) {
  const people = getPeople()
  const bioParagraphs = person.bio.split('\n\n')

  return (
    <>
      <GradientBackground dominantColor={person.backgroundColor} />
      <NavBar showLogoImmediately={true} navTint={person.backgroundColor as 'red' | 'dark-blue' | 'purple'} people={people} />

      <main
        style={{
          minHeight: '100vh',
          paddingTop: '140px',
          paddingBottom: '80px',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/*
          4 named grid areas: top · photo · bottom · links
          Desktop: 2×2 grid — areas defined in .profile-grid-normal / .profile-grid-reversed
          Mobile:  single column in order top → photo → bottom → links
          (grid-template-areas on the parent handles all placement; DOM order = mobile order)
        */}
        <div className={`profile-grid ${reversed ? 'profile-grid-reversed' : 'profile-grid-normal'}`}>

          {/* ── top: name, tagline, tags ── */}
          <div className="pf-top">
            <h1
              style={{
                fontFamily: 'var(--font-heal)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: '#F2EDE4',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}
            >
              {person.name}
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'rgba(242, 237, 228, 0.65)',
                fontWeight: 400,
                letterSpacing: '0.04em',
                marginBottom: '20px',
                marginLeft: '20px',
              }}
            >
              {person.tagline}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginLeft: '8px',
              }}
            >
              {person.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            <blockquote
              style={{
                marginTop: '40px',
                borderLeft: '1px solid rgba(242, 237, 228, 0.3)',
                paddingLeft: '20px',
                fontFamily: 'var(--font-mono)',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'rgba(242, 237, 228, 0.6)',
                lineHeight: 1.6,
                maxWidth: '50ch',
              }}
            >
              {person.quote}
            </blockquote>
          </div>

          {/* ── photo ── */}
          <div className="pf-photo">
            <PolaroidPhoto src={person.photo} alt={person.name} />
          </div>

          {/* ── bottom: bio + quote ── */}
          <div className="pf-bottom">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginLeft: '16px',
              }}
            >
              {bioParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="pf-bio-text"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'rgba(242, 237, 228, 0.85)',
                    fontWeight: 400,
                    lineHeight: 1.75,
                    maxWidth: '55ch',
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

          </div>

          {/* ── links ── */}
          <div
            className="pf-links"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'flex-start',
            }}
          >
            {person.website && (
              <a
                href={person.website}
                target="_blank"
                rel="noopener noreferrer"
                className="link-pill"
                style={{ marginLeft: '24px' }}
              >
                website ↗
              </a>
            )}
            {person.email && (
              <a
                href={`mailto:${person.email}`}
                className="link-pill"
                style={{ marginLeft: '0px' }}
              >
                email me
              </a>
            )}
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-pill"
                style={{ marginLeft: '40px' }}
              >
                linkedin ↗
              </a>
            )}
            {person.behance && (
              <a
                href={person.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="link-pill"
                style={{ marginLeft: '40px' }}
              >
                behance ↗
              </a>
            )}
          </div>

        </div>
      </main>
    </>
  )
}
