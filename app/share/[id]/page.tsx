import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPeople, getPersonById } from '@/lib/people'

export function generateStaticParams() {
  return getPeople().map((p) => ({ id: p.id }))
}

export default async function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const person = getPersonById(id)
  if (!person) notFound()

  return (
    <div
      style={{
        width: '1080px',
        height: '1350px',
        position: 'relative',
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      {/* Red background — full bleed, no animation, no grain (clean for capture) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/assets/bg-red.png"
          alt=""
          fill
          priority
          unoptimized
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Card centered */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            width: '820px',
            border: '1.5px solid rgba(242, 237, 228, 0.25)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Photo: square, padded inside outline */}
          <div style={{ padding: '24px 24px 0 24px' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
              <Image
                src={person.photo}
                alt={person.name}
                fill
                unoptimized
                priority
                sizes="772px"
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              padding: '40px 32px 40px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              color: '#F2EDE4',
            }}
          >
            {/* Name + tagline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-heal)',
                  fontSize: '3.2rem',
                  lineHeight: 1.15,
                  fontWeight: 400,
                }}
              >
                {person.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.8rem',
                  color: 'rgba(242, 237, 228, 0.65)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.3,
                }}
              >
                {person.tagline}
              </p>
            </div>

            {/* Quote */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(242, 237, 228, 0.45)',
                }}
              >
                what i was always told was wrong:
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.65rem',
                  color: 'rgba(242, 237, 228, 0.85)',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                }}
              >
                {person.quote}
              </p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(242, 237, 228, 0.45)',
                }}
              >
                open to / available for:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {person.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: '1px solid rgba(242, 237, 228, 0.5)',
                      color: '#F2EDE4',
                      padding: '6px 14px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.2rem',
                      letterSpacing: '0.05em',
                      textTransform: 'lowercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wordmark watermark in bottom right */}
      <div style={{ position: 'absolute', bottom: '36px', right: '50px', zIndex: 2 }}>
        <Image src="/assets/brandmark.svg" alt="The Wrong List" width={70} height={40} />
      </div>
    </div>
  )
}
