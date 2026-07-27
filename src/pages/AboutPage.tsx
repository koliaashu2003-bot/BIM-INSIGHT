import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <main className="page">
      <p className="eyebrow reveal">About</p>
      <h1 className="section-title reveal">A learning + sharing platform for AEC</h1>

      <div className="prose reveal-2">
        <p>
          BIM Insight started as a quiz to sharpen knowledge of the tools that run the AEC industry —
          Revit, Navisworks, Dynamo and the rest. It's growing into a platform where professionals can
          both <strong>learn</strong> and <strong>reuse</strong> the automation that makes their work
          faster: a shared library of Dynamo scripts anyone can download, and anyone can contribute to.
        </p>

        <h2>How it works today</h2>
        <p>
          Everything is free during the beta. Browse the <Link to="/library">Script Library</Link> and
          download what you need. Built something useful?{' '}
          <Link to="/share">Share it</Link> and we'll review and publish it with credit to you.
        </p>

        <h2>The roadmap</h2>
        <ul className="timeline">
          <li>
            <b>Now — Beta (free).</b> Timed quiz, curated script library, and human-reviewed submissions.
          </li>
          <li>
            <b>Next — Author accounts.</b> Self-serve uploads, profiles, and versioned scripts.
          </li>
          <li>
            <b>Later — Premium.</b> A curated pro tier (advanced packs, interview-prep bundles) with paid
            downloads, so contributors can earn from what they build.
          </li>
        </ul>

        <h2>Planned pricing</h2>
      </div>

      <div className="price-grid reveal-3">
        <div className="price">
          <h3>Free</h3>
          <div className="amount">₹0</div>
          <p style={{ color: 'var(--muted)' }}>Always-on basics</p>
          <ul>
            <li>Full quiz access</li>
            <li>Download community scripts</li>
            <li>Submit your own scripts</li>
          </ul>
        </div>
        <div className="price featured">
          <h3>Premium</h3>
          <div className="amount">Coming soon</div>
          <p style={{ color: 'var(--muted)' }}>For power users</p>
          <ul>
            <li>Curated advanced script packs</li>
            <li>Interview-prep question bank (200+)</li>
            <li>Priority new releases</li>
          </ul>
        </div>
      </div>

      <p className="section-lede reveal-4" style={{ marginTop: 8 }}>
        Have feedback on where this should go? <Link to="/share">Get in touch</Link>.
      </p>
    </main>
  )
}
