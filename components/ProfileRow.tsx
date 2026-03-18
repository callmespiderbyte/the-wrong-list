'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { Person } from '@/lib/types'

interface ProfileRowProps {
  person: Person
  index: number
}

export default function ProfileRow({ person, index }: ProfileRowProps) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <div
      className="directory-row"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      style={{ paddingRight, cursor: 'pointer' }}
    >
      {/* Floating large image — follows cursor, only while photo is hovered */}
      {hovered && (
        <div
          style={{
            position: 'fixed',
            left: mousePos.x + 24,
            top: mousePos.y - 130,
            width: '260px',
            height: '260px',
            pointerEvents: 'none',
            zIndex: 999,
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            opacity: 1,
          }}
        >
          <Image
            src={person.photo}
            alt={person.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Photo thumbnail — hidden on hover */}
      <div
        className="dr-photo"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.2s ease' }}
      >
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
        <p className="dr-section-label">People always told me:</p>
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
