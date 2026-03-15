import Image from 'next/image'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import ProfileRow from '@/components/ProfileRow'
import GradientBackground from '@/components/GradientBackground'
import ScrollDownArrow from '@/components/ScrollDownArrow'
import ScrollDimmer from '@/components/ScrollDimmer'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const allPeople = getPeople()
  // Shuffle on every server render for discoverability
  const people = [...allPeople].sort(() => Math.random() - 0.5)

  return (
    <>
      <GradientBackground dominantColor="red" />
      <ScrollDimmer />
      <NavBar showLogoImmediately={false} people={people} />

      {/* Hero section */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          gap: '32px',
        }}
      >
        <Image
          src="/assets/wordmark.svg"
          alt="The Wrong List"
          width={424}
          height={243}
          style={{ height: 'auto', maxWidth: 'min(360px, 65vw)' }}
          priority
        />

        <Image
          src="/assets/slogan.svg"
          alt="Wrong by most standards, right by the ones that matter."
          width={354}
          height={175}
          style={{ height: 'auto', maxWidth: 'min(340px, 72vw)', opacity: 0.9 }}
          priority
        />

        {/* Scroll-down arrow button */}
        <ScrollDownArrow />
      </section>

      {/* Directory section */}
      <section
        id="directory"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          paddingLeft: 'clamp(16px, 4vw, 60px)',
          paddingRight: 'clamp(16px, 4vw, 60px)',
          paddingBottom: '80px',
        }}
      >
        {/* Section heading — hidden on mobile via .directory-header */}
        <div
          className="directory-header"
          style={{
            borderBottom: '1px solid rgba(242, 237, 228, 0.2)',
            paddingBottom: '12px',
            marginBottom: '0px',
            gridTemplateColumns: '96px minmax(160px, 220px) 1fr auto',
            gap: '24px',
          }}
        >
          <div />
          <div />
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(242, 237, 228, 0.4)',
            }}
          >
            what they were told was wrong
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(242, 237, 228, 0.4)',
              textAlign: 'right',
            }}
          >
            Open to / available for:
          </p>
        </div>

        {/* Person rows */}
        {people.map((person, index) => (
          <ProfileRow key={person.id} person={person} index={index} />
        ))}

        {/* Final bottom border */}
        <div
          style={{
            borderBottom: '1px solid rgba(242, 237, 228, 0.2)',
          }}
        />
      </section>
    </>
  )
}
