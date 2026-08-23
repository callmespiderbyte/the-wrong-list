'use client'

import { useState } from 'react'

const NOMINATE_EMAIL = 'design@jomiro.de'

export default function NominateForm() {
  const [nominatorName, setNominatorName] = useState('')
  const [nominatorEmail, setNominatorEmail] = useState('')
  const [nomineeName, setNomineeName] = useState('')
  const [nomineeEmail, setNomineeEmail] = useState('')
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const subject = `Nomination for The Wrong* List: ${nomineeName}`
    const bodyLines = [
      `Nominator: ${nominatorName} (${nominatorEmail})`,
      `Nominee: ${nomineeName}${nomineeEmail ? ` (${nomineeEmail})` : ''}`,
      '',
      'Why they’re a good fit:',
      reason,
    ]
    const mailtoLink = `mailto:${NOMINATE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`

    window.location.href = mailtoLink
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        style={{
          border: '1px solid rgba(242, 237, 228, 0.5)',
          padding: '24px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: 'rgba(242, 237, 228, 0.85)',
          lineHeight: 1.6,
        }}
      >
        Your email app should be opening now with everything filled in — just hit send to submit the nomination.
        <div style={{ marginTop: '16px' }}>
          <button
            className="link-pill"
            onClick={() => {
              setNominatorName('')
              setNominatorEmail('')
              setNomineeName('')
              setNomineeEmail('')
              setReason('')
              setSubmitted(false)
            }}
          >
            nominate someone else
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <label className="nominate-label">
        Your name
        <input
          className="nominate-input"
          type="text"
          required
          value={nominatorName}
          onChange={(e) => setNominatorName(e.target.value)}
        />
      </label>

      <label className="nominate-label">
        Your email
        <input
          className="nominate-input"
          type="email"
          required
          value={nominatorEmail}
          onChange={(e) => setNominatorEmail(e.target.value)}
        />
      </label>

      <label className="nominate-label">
        Their name
        <input
          className="nominate-input"
          type="text"
          required
          value={nomineeName}
          onChange={(e) => setNomineeName(e.target.value)}
        />
      </label>

      <label className="nominate-label">
        <span>Their email <span className="nominate-optional">(optional)</span></span>
        <input
          className="nominate-input"
          type="email"
          value={nomineeEmail}
          onChange={(e) => setNomineeEmail(e.target.value)}
        />
      </label>

      <label className="nominate-label">
        Why are they a good fit?
        <textarea
          className="nominate-input nominate-textarea"
          required
          rows={5}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </label>

      <button type="submit" className="link-pill" style={{ alignSelf: 'flex-start' }}>
        send nomination
      </button>
    </form>
  )
}
