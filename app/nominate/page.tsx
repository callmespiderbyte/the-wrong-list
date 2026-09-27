import type { Metadata } from 'next'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import GradientBackground from '@/components/GradientBackground'
import NominateForm from '@/components/NominateForm'

export const metadata: Metadata = {
  title: 'Nominate Someone',
  description: "Know someone who was told they were too much, too different, or too hard to place? Nominate them for The Wrong* List.",
  alternates: { canonical: 'https://thewronglist.com/nominate' },
}

export default function NominatePage() {
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
          alignItems: 'center',
          paddingLeft: 'clamp(32px, 8vw, 120px)',
          paddingRight: 'clamp(32px, 8vw, 120px)',
          paddingTop: '160px',
          paddingBottom: '80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ width: '100%', maxWidth: '560px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heal)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#F2EDE4',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Nominate someone
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
              marginBottom: '40px',
            }}
          >
            Know someone who was told they were too much, too different, or too hard to place? Tell us who they are and why.
          </p>

          <NominateForm />
        </div>
      </main>
    </>
  )
}
