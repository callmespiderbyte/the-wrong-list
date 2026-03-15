'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Person } from '@/lib/types'

interface ProfileRowProps {
  person: Person
  index: number
}

export default function ProfileRow({ person, index }: ProfileRowProps) {
  const router = useRouter()

  // Alternating offset on right only — photos always flush left
  const isOdd = index % 2 !== 0
  const paddingRight = isOdd ? '0px' : '8px'

  function handleClick() {
    router.push(`/people/${person.id}`)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className="directory-row"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      style={{ paddingRight, cursor: 'pointer' }}
    >
      {/* Photo */}
      <div className="dr-photo">
        <Image
          src={person.photo}
          alt={person.name}
          width={80}
          height={80}
          style={{ display: 'block', objectFit: 'cover', width: '80px', height: '80px' }}
        />
      </div>

      {/* Name + tagline */}
      <div className="dr-name-block">
        <p
          style={{
            fontFamily: 'var(--font-heal)',
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: '#F2EDE4',
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: '4px',
          }}
        >
          {person.name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'rgba(242, 237, 228, 0.6)',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          {person.tagline}
        </p>
      </div>

      {/* Quote — label shown on mobile, line-clamped on desktop */}
      <div className="dr-quote-section">
        <p className="dr-section-label">What they were told was wrong:</p>
        <p
          className="dr-quote-text"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'rgba(242, 237, 228, 0.75)',
            lineHeight: 1.5,
          }}
        >
          {person.quote}
        </p>
      </div>

      {/* Tags — label shown on mobile, right-aligned on desktop */}
      <div className="dr-tags-section">
        <p className="dr-section-label">Open to / available for:</p>
        <div className="dr-tags-pills">
          {person.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
