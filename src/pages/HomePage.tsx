import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { COMMUNITY_STATS } from '../data/community'

const HeroScene = lazy(() => import('../components/HeroScene').then((m) => ({ default: m.HeroScene })))

const FEATURES = [
  {
    icon: '⚙️',
    title: 'Dynamo Exchange',
    text: 'Browse, download, and share battle-tested Dynamo graphs across automation, geometry, data, and analysis.',
    to: '/exchange',
    cta: 'Explore scripts',
  },
  {
    icon: '✍️',
    title: 'Insight Blog',
    text: 'Deep-dives and field notes on BIM management, computational design, coordination, and interoperability.',
    to: '/blog',
    cta: 'Read the blog',
  },
  {
    icon: '🤝',
    title: 'AEC Community',
    text: 'Ask questions, showcase your work, join live clinics, and connect with practitioners worldwide.',
    to: '/community',
    cta: 'Join the community',
  },
  {
    icon: '🧠',
    title: 'Knowledge Quiz',
    text: 'Test your grip on the AEC software stack — Revit, Navisworks, Dynamo, ACC, and more — in a timed challenge.',
    to: '/quiz',
    cta: 'Take the quiz',
  },
]

const WORKFLOW = [
  { step: '01', title: 'Discover', text: 'Search a growing library of graphs and articles built by working professionals.' },
  { step: '02', title: 'Download', text: 'Grab a graph close to your problem, read it node by node, and adapt it to your model.' },
  { step: '03', title: 'Contribute', text: 'Upload your own scripts and write-ups so the next person starts a step ahead.' },
  { step: '04', title: 'Connect', text: 'Trade ideas in the community, join events, and grow alongside the industry.' },
]

function formatNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

export function HomePage() {
  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-3d" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
        <div className="hero-content">
          <p className="eyebrow">For Architecture · Engineering · Construction</p>
          <h1 className="hero-title">
            The platform where the <span className="accent-text">AEC industry</span> builds together.
          </h1>
          <p className="hero-lede">
            Exchange Dynamo scripts, share your knowledge, and grow a community of professionals
            automating the built environment — all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/exchange" className="btn-primary btn-large">
              Explore the Exchange
            </Link>
            <Link to="/community" className="btn-ghost btn-large">
              Join the community
            </Link>
          </div>

          <dl className="hero-stats">
            <div>
              <dt>{formatNumber(COMMUNITY_STATS.members)}+</dt>
              <dd>Members</dd>
            </div>
            <div>
              <dt>{formatNumber(COMMUNITY_STATS.scriptsShared)}+</dt>
              <dd>Scripts shared</dd>
            </div>
            <div>
              <dt>{formatNumber(COMMUNITY_STATS.discussions)}+</dt>
              <dd>Discussions</dd>
            </div>
            <div>
              <dt>{COMMUNITY_STATS.countries}</dt>
              <dd>Countries</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Feature cards */}
      <section className="section">
        <div className="section-head">
          <h2>Everything an AEC professional needs</h2>
          <p>One hub for the tools, knowledge, and people behind modern building workflows.</p>
        </div>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <Link key={f.title} to={f.to} className="feature-card">
              <span className="feature-icon" aria-hidden="true">
                {f.icon}
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <span className="feature-cta">{f.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="section">
        <div className="section-head">
          <h2>How BIM Insight works</h2>
          <p>A simple loop that compounds — the more the community shares, the more everyone gains.</p>
        </div>
        <div className="workflow-grid">
          {WORKFLOW.map((w) => (
            <div key={w.step} className="workflow-card">
              <span className="workflow-step">{w.step}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="section">
        <div className="cta-band">
          <h2>Have a graph worth sharing?</h2>
          <p>
            Upload your Dynamo scripts, publish your write-ups, and help the AEC community move
            faster. It is free and takes minutes.
          </p>
          <div className="hero-actions">
            <Link to="/exchange" className="btn-primary btn-large">
              Upload a script
            </Link>
            <Link to="/about" className="btn-ghost btn-large">
              Learn more
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
