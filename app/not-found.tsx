import Link from 'next/link'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import GradientBackground from '@/components/GradientBackground'

export default function NotFound() {
  const people = getPeople()

  return (
    <>
      <GradientBackground dominantColor="red" />
      <NavBar showLogoImmediately={true} navTint="red" people={people} />

      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
            Error
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-heal)',
              fontSize: 'clamp(5rem, 20vw, 10rem)',
              fontWeight: 400,
              color: 'var(--off-white)',
              lineHeight: 1,
              marginBottom: '32px',
            }}
          >
            404
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
            Being wrong is kind of our thing. A broken link, less so.
          </p>

          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              color: 'var(--off-white)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(242, 237, 228, 0.4)',
              paddingBottom: '2px',
              transition: 'border-color 0.15s ease',
            }}
          >
            ← Back to the list
          </Link>

        </div>
      </main>
    </>
  )
}
