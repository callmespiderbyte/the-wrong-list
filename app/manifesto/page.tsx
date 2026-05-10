import type { Metadata } from 'next'
import { getPeople } from '@/lib/people'
import NavBar from '@/components/NavBar'
import GradientBackground from '@/components/GradientBackground'

export const metadata: Metadata = {
  title: 'Why Wrong* — The Wrong List',
  description: 'The manifesto behind The Wrong List. Who gets to define wrong? A question about professional identity, frameworks that exclude, and the people they failed.',
  alternates: { canonical: '/manifesto' },
}

const paragraphs = [
  "There's a footnote in most people's careers. A moment where someone -- a manager, a client, a well-meaning mentor, occasionally a parent -- looked at what you were doing and said: that's not how it works. Too niche. Too much. Too hard to explain at a dinner party. You should probably tone it down.",
  "Most people tone it down.",
  "The ones on this list kept going. Not out of stubbornness, not because they had a plan -- most of them didn't -- but because the alternative was shrinking into a version of themselves that fit other people's expectations better than it fit them. That's a trade most people quietly make. The people here didn't make it, or made it and eventually took it back.",
  "The Wrong* List isn't a monument to rebellion. Nobody here is performing the misfit. These are people who kept doing the work their way, usually at personal cost, often without much validation, and built something that couldn't have existed any other way. The asterisk isn't ironic. It's a footnote -- the kind that says: wrong by whose standards, exactly?",
  'Because the definition of "wrong" has always belonged to whoever set the template. The career path that doesn\'t scan on a CV. The business model that makes investors uncomfortable. The creative practice that sits between categories and therefore fits neatly into none of them. None of that is failure. What it is, usually, is evidence that someone is operating outside a framework that was never built for them.',
  "That framework isn't neutral. It was designed for a particular kind of legibility -- for people who can summarise what they do in one sentence, who climbed a ladder someone else built, who made sensible choices at sensible times. Useful, sure. Also not the only way.",
  "The people here took longer to find their footing, or found it via a stranger route, or were told repeatedly that what they were doing wasn't quite right. Some lost work over it. Some lost time. A few lost relationships. The thing they didn't lose was whatever made them worth paying attention to in the first place.",
  "This isn't a job board. Not a networking platform dressed up in cooler clothes. It's a hand-picked, invite-only directory of people worth knowing -- sourced specifically from the edges of their industries. Hire someone predictable if that's what you need. If you want someone who has had to think for themselves because the manual didn't cover their situation, start here.",
  "Each profile carries one thing: what they were always told was wrong with them. Not credentials. Not a client list. The thing. Because that's usually the most accurate description of what makes them good at what they do.",
]

export default function ManifestoPage() {
  const people = getPeople()

  return (
    <>
      <GradientBackground dominantColor="dark-blue" />
      <NavBar showLogoImmediately={true} navTint="dark-blue" people={people} />

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
        <div style={{ maxWidth: '680px', width: '100%' }}>
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
            Manifesto
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
            Why Wrong*
          </h1>

          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="about-body-text"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'rgba(242, 237, 228, 0.75)',
                lineHeight: 1.8,
                marginBottom: i < paragraphs.length - 1 ? '20px' : 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </main>
    </>
  )
}
