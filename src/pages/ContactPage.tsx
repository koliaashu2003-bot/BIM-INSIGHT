import { useState } from 'react'

const TOPICS = ['General question', 'Script submission', 'Partnership', 'Bug / feedback', 'Press']

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please add your name and a message.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }
    // Client-only demo submit. Wire to Formspree / your API to deliver mail.
    setSent(true)
    setError('')
  }

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <p className="eyebrow">Contact</p>
        <h1>Get in touch</h1>
        <p className="page-lede">
          Questions, ideas, partnerships, or feedback — we would love to hear from you.
        </p>
      </header>

      <div className="contact-layout">
        <aside className="contact-aside">
          <div className="contact-item">
            <span className="feature-icon" aria-hidden="true">
              ✉️
            </span>
            <h3>Email</h3>
            <p className="script-meta">hello@biminsight.dev</p>
          </div>
          <div className="contact-item">
            <span className="feature-icon" aria-hidden="true">
              💬
            </span>
            <h3>Community</h3>
            <p className="script-meta">Ask in the discussions — often the fastest answer.</p>
          </div>
          <div className="contact-item">
            <span className="feature-icon" aria-hidden="true">
              🤝
            </span>
            <h3>Partnerships</h3>
            <p className="script-meta">Running a course, tool, or event? Let us collaborate.</p>
          </div>
        </aside>

        <div className="contact-form-wrap">
          {sent ? (
            <div className="prose-card">
              <h2>Message sent ✓</h2>
              <p>
                Thanks, {form.name.split(' ')[0] || 'there'} — we have received your note and will get
                back to you soon. (This demo captures the form client-side; connect it to your mail
                service to deliver messages.)
              </p>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  setSent(false)
                  setForm({ name: '', email: '', topic: TOPICS[0], message: '' })
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form prose-card" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Name *
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Email *
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </label>
              </div>
              <label className="form-full">
                Topic
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="form-full">
                Message *
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  placeholder="How can we help?"
                />
              </label>
              {error && <p className="form-error">{error}</p>}
              <button type="submit" className="btn-primary btn-large">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
