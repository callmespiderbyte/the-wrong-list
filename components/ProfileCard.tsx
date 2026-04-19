'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Person } from '@/lib/types'

const SCRAMBLE_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const SCRAMBLE_LOWER = 'abcdefghijklmnopqrstuvwxyz'
const DURATION = 800
const TICK = 40

function useScrollScramble(text: string) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = Date.now()
        let timer: ReturnType<typeof setTimeout>

        function tick() {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / DURATION, 1)

          const result = text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              const resolveAt = (i + 1) / text.replace(/ /g, '').length
              if (progress >= resolveAt) return char
              const pool = char === char.toUpperCase() ? SCRAMBLE_UPPER : SCRAMBLE_LOWER
              return pool[Math.floor(Math.random() * pool.length)]
            })
            .join('')

          setDisplay(result)

          if (progress < 1) {
            timer = setTimeout(tick, TICK)
          } else {
            setDisplay(text)
          }
        }

        tick()
        return () => clearTimeout(timer)
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  return { display, ref }
}

export default function ProfileCard({ person, index }: { person: Person; index: number }) {
  const router = useRouter()
  const { display: scrambledName, ref: scrambleRef } = useScrollScramble(person.name)

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
      className="profile-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      ref={scrambleRef}
      style={{
        animation: 'rowEntrance 0.45s ease both',
        animationDelay: `${Math.min(index * 45, 500)}ms`,
      }}
    >
      {/* Photo — square, with padding from card outline */}
      <div className="pc-photo-wrapper">
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        </div>
      </div>

      {/* Card content */}
      <div className="pc-content">

        {/* Name + tagline */}
        <div className="pc-name-block">
          <p className="pc-name">{scrambledName}</p>
          <p className="pc-tagline">{person.tagline}</p>
        </div>

        {/* Quote */}
        <div className="pc-section">
          <p className="pc-section-label">what i was always told was wrong:</p>
          <p className="pc-quote">{person.quote}</p>
        </div>

        {/* Tags */}
        <div className="pc-section">
          <p className="pc-section-label">open to / available for:</p>
          <div className="pc-tags">
            {person.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
