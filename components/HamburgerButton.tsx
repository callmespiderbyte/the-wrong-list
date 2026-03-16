'use client'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className="hamburger-btn"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '12px 0 12px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        className="hamburger-span"
        style={{
          transform: isOpen ? 'translateY(13px) rotate(45deg)' : 'none',
        }}
      />
      <span
        className="hamburger-span"
        style={{
          opacity: isOpen ? 0 : 1,
        }}
      />
      <span
        className="hamburger-span"
        style={{
          transform: isOpen ? 'translateY(-13px) rotate(-45deg)' : 'none',
        }}
      />
    </button>
  )
}
