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
      className={`hamburger-btn${isOpen ? ' is-open' : ''}`}
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
      <span className="hamburger-span hamburger-span--top" />
      <span className="hamburger-span hamburger-span--mid" />
      <span className="hamburger-span hamburger-span--bot" />
    </button>
  )
}
