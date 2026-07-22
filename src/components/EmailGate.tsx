import { useState, type FormEvent } from 'react'
import { saveEmail } from '../utils/storage'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function EmailGate({ onUnlock }: { onUnlock: () => void }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setError('Enter a valid email address')
      return
    }
    saveEmail(email)
    onUnlock()
  }

  return (
    <div className="email-gate">
      <h3>Unlock the detailed explanations</h3>
      <p>Get the "why" behind every answer, sent straight to your inbox for next time.</p>
      <form onSubmit={handleSubmit} className="email-form">
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
          }}
          aria-label="Email address"
          required
        />
        <button type="submit" className="btn-primary">
          Unlock explanations
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
      <p className="fine-print">No spam — just BIM interview prep tips. Unsubscribe anytime.</p>
    </div>
  )
}
