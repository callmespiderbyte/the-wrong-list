import Image from 'next/image'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import GradientBackground from '@/components/GradientBackground'

export default function AboutPage() {
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
          alignItems: 'center',
          paddingLeft: 'clamp(32px, 8vw, 120px)',
          paddingRight: 'clamp(32px, 8vw, 120px)',
          paddingTop: '160px',
          paddingBottom: '80px',
          position: 'relative',
          zIndex: 1,
          gap: '48px',
        }}
      >
        {/* Logo + tagline side by side, logo sitting higher */}
        <div
          className="about-hero"
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

        {/* Body copy */}
        <div
          style={{
            maxWidth: '560px',
          }}
        >
          <p
            className="about-body-text"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            The Wrong* List is a curated, invite-only directory of people who got somewhere interesting by ignoring the status quo.
          </p>
          <p
            className="about-body-text"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            Every person here was reached out to directly, and chose to be here. No scraping, no collecting, no adding people without asking. That matters&mdash;because what you&rsquo;re looking at isn&rsquo;t a list of profiles. It&rsquo;s a group of people who, when asked, said yes. Who saw the premise and recognised something in it.
          </p>
          <p
            className="about-body-text"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            They aren&rsquo;t &ldquo;wrong&rdquo;; they&rsquo;ve just been labelled as such by most standards. The good news is: &ldquo;most&rdquo; standards aren&rsquo;t the ones we care about here. In fact, they&rsquo;re the ones most worth challenging.
          </p>
          <p
            className="about-body-text"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            The people on this list were told to specialise, to tone it down, to pick a lane, to be more realistic. They were &ldquo;too much&rdquo;, &ldquo;too loud&rdquo;, &ldquo;too ambitious&rdquo;&hellip; and they went their own way anyway. What makes them worth paying attention to isn&rsquo;t just what they do now, but what they chose not to do back then.
          </p>
          <p
            className="about-body-text"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            The list is part-inspiration, part-address book. Everyone here is open to something&mdash;mentorship, collaboration, a conversation, a partnership&mdash;and it varies by person, so check their profile and see what fits. Whether you want someone new to follow, or someone to send a burning question to, you&rsquo;ll find someone here that matches your energy.
          </p>
          <p
            className="about-body-text"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(242, 237, 228, 0.75)',
              lineHeight: 1.8,
            }}
          >
            PS: New people get added over time, so it&rsquo;s worth checking back every now and then.
          </p>
        </div>
      </main>
    </>
  )
}
