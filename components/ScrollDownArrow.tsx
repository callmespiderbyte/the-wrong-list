'use client'

export default function ScrollDownArrow() {
  return (
    <a
      href="#directory"
      aria-label="Scroll to directory"
      style={{
        marginTop: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        border: '1px solid rgba(242, 237, 228, 0.5)',
        borderRadius: 0,
        color: '#F2EDE4',
        textDecoration: 'none',
        fontSize: '1.2rem',
        animation: 'bounceDown 1.4s ease-in-out infinite',
        transition: 'background-color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(242, 237, 228, 0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      ↓
    </a>
  )
}
