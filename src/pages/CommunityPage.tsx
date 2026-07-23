import { useState } from 'react'
import {
  COMMUNITY_STATS,
  DISCUSSIONS,
  EVENTS,
  FEATURED_MEMBERS,
} from '../data/community'
import { saveNewsletterEmail } from '../utils/exchangeStorage'
import { formatDate } from '../utils/format'

function formatNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

export function CommunityPage() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const [error, setError] = useState('')

  function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    saveNewsletterEmail(email)
    setJoined(true)
    setError('')
  }

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <p className="eyebrow">Community</p>
        <h1>Where AEC professionals build together</h1>
        <p className="page-lede">
          Ask questions, show your work, join live events, and connect with a global network of
          people automating the built environment.
        </p>
      </header>

      <div className="stat-band">
        <div>
          <strong>{formatNumber(COMMUNITY_STATS.members)}+</strong>
          <span>Members</span>
        </div>
        <div>
          <strong>{formatNumber(COMMUNITY_STATS.scriptsShared)}+</strong>
          <span>Scripts shared</span>
        </div>
        <div>
          <strong>{formatNumber(COMMUNITY_STATS.discussions)}+</strong>
          <span>Discussions</span>
        </div>
        <div>
          <strong>{COMMUNITY_STATS.countries}</strong>
          <span>Countries</span>
        </div>
      </div>

      {/* Discussions */}
      <section className="section">
        <div className="section-head section-head-left">
          <h2>Latest discussions</h2>
          <p>Jump into a thread or start your own.</p>
        </div>
        <ul className="discussion-list">
          {DISCUSSIONS.map((d) => (
            <li key={d.id} className="discussion-row">
              <div className="discussion-main">
                <span className="category-tag">{d.category}</span>
                <h3>{d.title}</h3>
                <p className="discussion-excerpt">{d.excerpt}</p>
                <p className="script-meta">
                  Started by {d.author} · last activity {d.lastActivity}
                </p>
              </div>
              <div className="discussion-stats">
                <span>
                  <strong>{d.replies}</strong> replies
                </span>
                <span>
                  <strong>{d.views.toLocaleString()}</strong> views
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Events */}
      <section className="section">
        <div className="section-head section-head-left">
          <h2>Upcoming events</h2>
          <p>Live clinics, meetups, and hands-on workshops.</p>
        </div>
        <div className="event-grid">
          {EVENTS.map((ev) => (
            <div key={ev.id} className="event-card">
              <div className="event-date">
                <span className="event-day">{new Date(ev.date).getDate()}</span>
                <span className="event-month">
                  {new Date(ev.date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </div>
              <div>
                <span className={`format-badge format-${ev.format.toLowerCase().replace('-', '')}`}>
                  {ev.format}
                </span>
                <h3>{ev.title}</h3>
                <p className="event-desc">{ev.description}</p>
                <p className="script-meta">
                  {formatDate(ev.date)} · {ev.time} · hosted by {ev.host}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Members */}
      <section className="section">
        <div className="section-head section-head-left">
          <h2>Featured members</h2>
          <p>A few of the people generously sharing what they know.</p>
        </div>
        <div className="member-grid">
          {FEATURED_MEMBERS.map((m) => (
            <div key={m.name} className="member-card">
              <span className="member-avatar" aria-hidden="true">
                {m.initials}
              </span>
              <h3>{m.name}</h3>
              <p className="member-role">{m.role}</p>
              <p className="script-meta">{m.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join */}
      <section className="section">
        <div className="cta-band">
          {joined ? (
            <>
              <h2>You are in! 🎉</h2>
              <p>
                Thanks for joining. We saved your email to this browser — connect it to your mailing
                list to send a real welcome.
              </p>
            </>
          ) : (
            <>
              <h2>Join the community</h2>
              <p>Get new scripts, articles, and event invites. No spam, unsubscribe anytime.</p>
              <form className="inline-form" onSubmit={handleJoin}>
                <input
                  type="email"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <button type="submit" className="btn-primary btn-large">
                  Join free
                </button>
              </form>
              {error && <p className="form-error">{error}</p>}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
