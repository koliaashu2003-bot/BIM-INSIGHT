import { useState, type FormEvent, type ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

// Blocks the whole app until the visitor signs in / signs up with email.
export function AuthGate({ children }: { children: ReactNode }) {
  const { user, signUp, signIn } = useAuth()

  const [mode, setMode] = useState<'signup' | 'signin'>('signup')
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)

  if (user) return <>{children}</>

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const res =
      mode === 'signup'
        ? signUp({ name, phone, email, password, acceptedTerms: accepted })
        : signIn(email, password)
    if (!res.ok) setError(res.error)
  }

  return (
    <div className="gate">
      <div className="gate-card card">
        <div className="nav-brand" style={{ fontSize: '1.5rem', marginBottom: 10 }}>
          BIM<span style={{ color: 'var(--accent)' }}>Insight</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: 6 }}>Members only</p>
        <p className="section-lede" style={{ marginBottom: 18 }}>
          Create an account or sign in to download and share Dynamo scripts, take the quiz, and join
          the community. Free during the beta.
        </p>

        <div className="auth-tabs">
          <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => { setMode('signup'); setError(null) }}>
            Create account
          </button>
          <button type="button" className={mode === 'signin' ? 'active' : ''} onClick={() => { setMode('signin'); setError(null) }}>
            Sign in
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: 20 }}>
          {mode === 'signup' && (
            <>
              <label className="field">
                <span>Full name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label className="field">
                <span>Phone number</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </label>
            </>
          )}
          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={4} />
            <span className="form-note">Email sign-in is a demo — please don't reuse a real password.</span>
          </label>

          {mode === 'signup' && (
            <label className="check">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
              <span>I accept the Terms &amp; Conditions and Privacy Policy.</span>
            </label>
          )}

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn-primary btn-large" style={{ width: '100%', justifyContent: 'center' }}>
            {mode === 'signup' ? 'Create free account' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
