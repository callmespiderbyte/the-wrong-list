'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function NominateForm() {
  const [nominatorName, setNominatorName] = useState('')
  const [nominatorEmail, setNominatorEmail] = useState('')
  const [nomineeName, setNomineeName] = useState('')
  const [nomineeEmail, setNomineeEmail] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  function resetForm() {
    setNominatorName('')
    setNominatorEmail('')
    setNomineeName('')
    setNomineeEmail('')
    setReason('')
    setStatus('idle')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `Nomination for The Wrong* List: ${nomineeName}`,
          from_name: nominatorName,
          replyto: nominatorEmail,
          'Nominator name': nominatorName,
          'Nominator email': nominatorEmail,
          'Nominee name': nomineeName,
          'Nominee email': nomineeEmail || 'not provided',
          'Why they’re a good fit': reason,
        }),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
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
        Sent — thank you. We&rsquo;ll take it from here.
        <div style={{ marginTop: '16px' }}>
          <button className="link-pill" onClick={resetForm}>
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

      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(242, 237, 228, 0.85)' }}>
          Something went wrong sending that — mind trying again?
        </p>
      )}

      <button type="submit" className="link-pill" style={{ alignSelf: 'flex-start' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'sending…' : 'send nomination'}
      </button>
    </form>
  )
}
