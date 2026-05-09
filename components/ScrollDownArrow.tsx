'use client'

export default function ScrollDownArrow() {
  return (
    <>
      <style>{`
        .scroll-cta { display: flex; flex-direction: column; align-items: center; gap: 12px; color: #F2EDE4; text-decoration: none; margin-top: 56px; }
        .scroll-cta-label { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(242,237,228,0.7); transition: color 0.15s ease; }
        .scroll-cta:hover .scroll-cta-label { color: rgba(242,237,228,1); }
        .scroll-cta-asterisk { font-family: var(--font-heal); font-size: 1.1em; vertical-align: super; line-height: 0; }
        .scroll-cta-box { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border: 1px solid rgba(242,237,228,0.5); font-size: 1.2rem; animation: bounceDown 1.4s ease-in-out infinite; transition: background-color 0.15s ease; }
        .scroll-cta:hover .scroll-cta-box { background-color: rgba(242,237,228,0.08); }
      `}</style>
      <a href="#directory" className="scroll-cta" aria-label="Scroll to directory">
        <span className="scroll-cta-label">
          Meet The Wrong<span className="scroll-cta-asterisk">*</span>Doers
        </span>
        <div className="scroll-cta-box">↓</div>
      </a>
    </>
  )
}
