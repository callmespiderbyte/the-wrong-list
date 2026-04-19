import Image from 'next/image'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import ShuffledCards from '@/components/ShuffledCards'
import GradientBackground from '@/components/GradientBackground'
import ScrollDownArrow from '@/components/ScrollDownArrow'
import ScrollDimmer from '@/components/ScrollDimmer'

export default function HomePage() {
  const people = getPeople()

  return (
    <>
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
        <span className="sr-only">Wrong by most standards, right by the ones that matter.</span>

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
        {/* Cards — shuffled client-side so page stays statically cached */}
        <ShuffledCards people={people} />
      </section>
    </>
  )
}
