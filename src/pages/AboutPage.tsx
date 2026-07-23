import { Link } from 'react-router-dom'

const VALUES = [
  {
    icon: '🔓',
    title: 'Open by default',
    text: 'Knowledge compounds when it is shared. Scripts, articles, and answers here are free to use and learn from.',
  },
  {
    icon: '🛠️',
    title: 'Practical over theoretical',
    text: 'Everything is grounded in real projects — the graphs that shipped, the standards that stuck, the fixes that worked.',
  },
  {
    icon: '🌍',
    title: 'Global &amp; inclusive',
    text: 'Architects, engineers, and constructors from 70+ countries. Every discipline and skill level is welcome.',
  },
  {
    icon: '🚀',
    title: 'Built to help you grow',
    text: 'From your first Dynamo graph to leading a computational team, the platform grows with your career.',
  },
]

const DISCIPLINES = [
  { title: 'Architecture', text: 'Design automation, documentation, and parametric façades.' },
  { title: 'Engineering', text: 'Structural and MEP coordination, analysis, and data workflows.' },
  { title: 'Construction', text: 'Clash detection, quantities, and field-ready information.' },
]

export function AboutPage() {
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <p className="eyebrow">About</p>
        <h1>We are building the connective tissue of AEC</h1>
        <p className="page-lede">
          BIM Insight exists to help the Architecture, Engineering, and Construction industry work
          smarter — by pooling the scripts, knowledge, and people that make modern building
          workflows possible.
        </p>
      </header>

      <section className="prose-card">
        <h2>Our mission</h2>
        <p>
          Every day, thousands of AEC professionals solve the same problems in isolation — rebuilding
          the same Dynamo graph, relearning the same standard, rediscovering the same coordination
          trick. We think that is a waste of collective talent.
        </p>
        <p>
          BIM Insight is a single home where that knowledge is exchanged instead of reinvented. Share
          a graph, publish what you have learned, ask the community, and leave every project a little
          better equipped than you started it.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>What we value</h2>
        </div>
        <div className="value-grid">
          {VALUES.map((v) => (
            <div key={v.title} className="value-card">
              <span className="feature-icon" aria-hidden="true">
                {v.icon}
              </span>
              <h3>{v.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: v.text }} />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Built for every discipline</h2>
          <p>The A, the E, and the C — one shared platform.</p>
        </div>
        <div className="feature-grid feature-grid-3">
          {DISCIPLINES.map((d) => (
            <div key={d.title} className="feature-card feature-card-static">
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="cta-band">
          <h2>Ready to contribute?</h2>
          <p>Upload your first script or start a discussion — the community is waiting.</p>
          <div className="hero-actions">
            <Link to="/exchange" className="btn-primary btn-large">
              Go to the Exchange
            </Link>
            <Link to="/contact" className="btn-ghost btn-large">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
