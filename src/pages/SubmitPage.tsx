import { useState, type FormEvent } from 'react'
import { SCRIPT_CATEGORIES } from '../data/scripts'
import { SUBMIT_EMAIL, SUBMIT_FORM_URL } from '../config'

export function SubmitPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(SCRIPT_CATEGORIES[0])
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = `New Dynamo script submission: ${title || 'Untitled'}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Title: ${title}`,
      `Category: ${category}`,
      `Link to script (.dyn / .py / repo / Drive): ${link}`,
      '',
      'Description:',
      description,
    ].join('\n')
    window.location.href = `mailto:${SUBMIT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <main className="page">
      <p className="eyebrow reveal">Contribute</p>
      <h1 className="section-title reveal">Share a script</h1>
      <p className="section-lede reveal">
        Built something useful in Dynamo? Submit it and we'll review and publish it to the library so
        peers anywhere can download it. Free during the beta.
      </p>

      {SUBMIT_FORM_URL ? (
        <div className="form-card card reveal-2">
          <p>Submit your script through our form:</p>
          <p style={{ marginTop: 16 }}>
            <a className="btn-primary" href={SUBMIT_FORM_URL} target="_blank" rel="noreferrer">
              Open submission form →
            </a>
          </p>
        </div>
      ) : (
        <form className="form-card card reveal-2" onSubmit={handleSubmit}>
          <div className="callout">
            During the beta, submissions are reviewed by a human before publishing. Host your script
            somewhere shareable (GitHub, Google Drive, Dropbox) and paste the link below — you'll keep
            the credit as its author.
          </div>

          <label className="field">
            <span>Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="field">
            <span>Script title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label className="field">
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)}>
              {SCRIPT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Link to the script</span>
            <input
              type="url"
              placeholder="https://github.com/… or a Drive link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
            <span className="form-note">A public link to your .dyn or .py file.</span>
          </label>
          <label className="field">
            <span>What does it do?</span>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>

          <button type="submit" className="btn-primary">
            Submit for review
          </button>
          {sent && (
            <p className="form-note" style={{ marginTop: 12 }}>
              Your email app should have opened with the details pre-filled — just hit send. Didn't open?
              Email us directly at {SUBMIT_EMAIL}.
            </p>
          )}
        </form>
      )}

      <p className="section-lede reveal-3" style={{ marginTop: 28 }}>
        <strong>Coming soon:</strong> self-serve uploads and author accounts, so you can publish
        directly and (later) earn from premium scripts.
      </p>
    </main>
  )
}
