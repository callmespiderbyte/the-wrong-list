'use client'

import { useRouter } from 'next/navigation'
import { Person } from '@/lib/types'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  people: Person[]
}

export default function MenuOverlay({ isOpen, onClose, people }: MenuOverlayProps) {
  const router = useRouter()

  function handleNavigate(href: string) {
    onClose()
    setTimeout(() => {
      router.push(href)
    }, 160)
  }

  function handleSurpriseMe() {
    if (people.length === 0) return
    const randomPerson = people[Math.floor(Math.random() * people.length)]
    handleNavigate(`/people/${randomPerson.id}`)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '160px 48px 48px 48px',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.15s ease',
      }}
    >
      {/* Navigation links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button onClick={() => handleNavigate('/')} className="menu-nav-link">
          The Wrong* List
        </button>
        <button onClick={() => handleNavigate('/about')} className="menu-nav-link">
          What is this?
        </button>
        <button onClick={() => handleNavigate('/curator')} className="menu-nav-link">
          Who made this
        </button>
      </nav>

      {/* Bottom: Surprise me */}
      <div>
        <button
          onClick={handleSurpriseMe}
          style={{
            background: 'none',
            border: '1px solid rgba(242, 237, 228, 0.4)',
            cursor: 'pointer',
            color: '#F2EDE4',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'lowercase',
            padding: '10px 20px',
            borderRadius: 0,
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(242, 237, 228, 0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          surprise me →
        </button>
      </div>
    </div>
  )
}
