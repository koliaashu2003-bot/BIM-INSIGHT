import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AuthPage() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const res =
      mode === 'signup'
        ? signUp({ name, phone, email, password, acceptedTerms: accepted })
        : signIn(email, password)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <main className="page auth-page">
      <div className="auth-card card reveal">
        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'signup' ? 'active' : ''}
            onClick={() => { setMode('signup'); setError(null) }}
          >
            Create account
          </button>
          <button
            type="button"
            className={mode === 'signin' ? 'active' : ''}
            onClick={() => { setMode('signin'); setError(null) }}
          >
            Sign in
          </button>
        </div>

        <p className="eyebrow" style={{ marginTop: 20 }}>
          {mode === 'signup' ? 'Join free' : 'Welcome back'}
        </p>
        <h1 className="section-title">
          {mode === 'signup' ? 'Create your free account' : 'Sign in to BIM Insight'}
        </h1>
        <p className="section-lede" style={{ marginBottom: 20 }}>
          {mode === 'signup'
            ? 'Free during the beta — download, upload, rate and comment on Dynamo scripts.'
            : 'Access your dashboard, uploads and saved activity.'}
        </p>

        <form onSubmit={handleSubmit}>
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
            />
            <span className="form-note">Demo sign-in — please don't reuse a real password.</span>
          </label>

          {mode === 'signup' && (
            <label className="check">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
              <span>
                I accept the <Link to="/terms">Terms &amp; Conditions</Link> and Privacy Policy. I
                understand scripts are provided free during the beta.
              </span>
            </label>
          )}

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn-primary btn-large" style={{ width: '100%', justifyContent: 'center' }}>
            {mode === 'signup' ? 'Create free account' : 'Sign in'}
          </button>
        </form>

        <p className="fine-print" style={{ textAlign: 'center' }}>
          {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            className="link-btn"
            onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError(null) }}
          >
            {mode === 'signup' ? 'Sign in' : 'Create one'}
          </button>
        </p>
      </div>
    </main>
  )
}
