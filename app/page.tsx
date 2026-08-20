import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import ProfileDirectory from '@/components/ProfileDirectory'
import GradientBackground from '@/components/GradientBackground'
import ScrollDownArrow from '@/components/ScrollDownArrow'
import ScrollDimmer from '@/components/ScrollDimmer'

export const metadata: Metadata = {
  title: 'The Wrong List — A Directory of Unconventional Professionals',
  description: 'A hand-picked, invite-only curated directory of unconventional professionals who were told they were too much. Browse the people who proved that wrong.',
  alternates: { canonical: '/' },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Wrong List',
  url: 'https://thewronglist.com',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Wrong List',
  url: 'https://thewronglist.com',
  logo: 'https://thewronglist.com/assets/brandmark.svg',
  description: 'A hand-picked, invite-only directory of unconventional professionals who were told they were too much, too different, or too hard to place.',
}

export default function HomePage() {
  const people = getPeople()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <p className="sr-only">
        The Wrong List is a curated, invite-only directory of unconventional thinkers — a place on the internet for like-minded odd-balls to find each other. This is a place to celebrate people who were told their ideas, methods, or identities were too different, too loud, or too unusual for conventional professional life. This list exists to find, connect with, learn from, and inspire each other.
      </p>
      <GradientBackground dominantColor="red" />
      <ScrollDimmer />
      <NavBar showLogoImmediately={false} navTint="red" people={people} />


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
        <h1 className="sr-only">The Wrong List — A Directory of Unconventional Professionals</h1>
        <Image
          src="/assets/wordmark.svg"
          alt=""
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
        <span className="sr-only">Wrong by most standards, right by the ones that matter.</span>

        {/* Floating "What is this?" callout */}
        <Link href="/about" className="hero-whatisthis-btn">&ldquo;What is this?&rdquo;</Link>

        {/* Scroll-down arrow button */}
        <ScrollDownArrow />
      </section>

      {/* Directory section — sticky toolbar (randomize / sort / filter) + profile grid */}
      <ProfileDirectory people={people} />
    </>
  )
}
