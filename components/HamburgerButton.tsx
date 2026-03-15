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
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '12px 0 12px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '5px',
        width: '46px',
        height: '46px',
        flexShrink: 0,
      }}
    >
      <span
        className="hamburger-span"
        style={{
          transform: isOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
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
          transform: isOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
        }}
      />
    </button>
  )
}
