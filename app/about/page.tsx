import Image from 'next/image'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import GradientBackground from '@/components/GradientBackground'

export default function AboutPage() {
  const people = getPeople()

  return (
    <>
      <GradientBackground dominantColor="red" />
      <NavBar showLogoImmediately={true} people={people} />

      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 'clamp(32px, 8vw, 120px)',
          paddingRight: 'clamp(32px, 8vw, 120px)',
          paddingTop: '100px',
          paddingBottom: '80px',
          position: 'relative',
          zIndex: 1,
          gap: '48px',
        }}
      >
        {/* Logo + tagline side by side, logo sitting higher */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 'clamp(24px, 4vw, 60px)',
          }}
        >
          <Image
            src="/assets/brandmark.svg"
            alt="The Wrong List"
            width={517}
            height={256}
            style={{ height: 'auto', maxWidth: 'min(420px, 52vw)', alignSelf: 'flex-start' }}
            priority
          />

          <Image
            src="/assets/slogan.svg"
            alt="Wrong by most standards, right by the ones that matter."
            width={354}
            height={175}
            style={{ height: 'auto', maxWidth: 'min(260px, 30vw)', opacity: 0.9, marginBottom: '8px' }}
            priority
          />
        </div>

        {/* Placeholder body text — slightly off-centre to the right */}
        <div
          style={{
            maxWidth: '560px',
            marginLeft: 'clamp(0px, 18vw, 220px)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            The Wrong List is a curated, invite-only directory of people who were told they were too much — too loud, too different, too unconventional, too early, too difficult. Replace this with your own copy.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            Being on this list isn't a consolation prize. It's a recognition that the people who change things are rarely the ones who followed the rules. Replace this paragraph with your own words.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
            }}
          >
            Membership is by invitation only. If you think someone belongs here, you know where to find us.
          </p>
        </div>
      </main>
    </>
  )
}
