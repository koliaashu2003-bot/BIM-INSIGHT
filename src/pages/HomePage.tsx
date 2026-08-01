import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TOTAL_QUESTIONS } from '../data/questions'
import { fetchLibraryRows, getBuiltinRows, type LibRow } from '../utils/libraryData'
import { ScriptCard } from '../components/ScriptCard'
import { HeroArt } from '../components/HeroArt'

export function HomePage() {
  // Show built-ins immediately, then fold in shared community uploads.
  const [rows, setRows] = useState<LibRow[]>(() => getBuiltinRows())
  useEffect(() => {
    fetchLibraryRows()
      .then(setRows)
      .catch(() => setRows(getBuiltinRows()))
  }, [])
  const featured = rows.slice(0, 6)

  return (
    <main className="page">
      {/* Hero — marketplace value proposition */}
      <section className="hero">
        <div className="reveal">
          <p className="eyebrow">Dynamo script library for BIM</p>
          <h1>
            Download, share &amp; discover <em>Dynamo</em> scripts for real BIM workflows.
          </h1>
          <p>
            A free, community library of Revit automation — Python-node scripts and{' '}
            <code>.dyn</code> graphs for documentation, modelling, data and QA. Grab what you need,
            upload what you build.
          </p>
          <div className="hero-cta">
            <Link className="btn-primary btn-large" to="/library">
              Browse scripts
            </Link>
            <Link className="btn-ghost" to="/share">
              Share a script
            </Link>
          </div>
          <p className="traction">
            {rows.length} scripts available · community uploads welcome · built by a working BIM
            engineer
          </p>
        </div>
        <div className="hero-art reveal-2" aria-hidden="true">
          <HeroArt />
        </div>
      </section>

      {/* Featured scripts — browsable content up front */}
      <section className="reveal-2">
        <div className="section-head">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="section-title">Scripts to grab right now</h2>
          </div>
          <Link className="see-all" to="/library">Browse all →</Link>
        </div>
        <div className="script-grid">
          {featured.map((row) => (
            <ScriptCard key={row.id} row={row} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="reveal-3 howto">
        <p className="eyebrow">How it works</p>
        <h2 className="section-title">Three steps to running automation</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <h3>Browse &amp; search</h3>
            <p>Filter by category, Revit/Dynamo version, or keyword to find the script you need.</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <h3>Download</h3>
            <p>Grab a <code>.dyn</code> graph or a Python-node script — free during the beta.</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <h3>Run in Dynamo</h3>
            <p>Open the graph in Dynamo for Revit, or paste the Python into a Python Script node.</p>
          </div>
        </div>
      </section>

      {/* Secondary: quiz teaser + contribute */}
      <section className="dual-cta reveal-3">
        <Link to="/quiz" className="dual-card">
          <div className="feature-ico">🎯</div>
          <h3>Test your knowledge</h3>
          <p>A quick {TOTAL_QUESTIONS}-question quiz across Revit, Navisworks, Dynamo, ACC &amp; more.</p>
          <span className="dual-link">Take the quiz →</span>
        </Link>
        <Link to="/share" className="dual-card accent">
          <div className="feature-ico">📤</div>
          <h3>Share a script</h3>
          <p>Built something useful? Upload it so peers anywhere can download it — with credit to you.</p>
          <span className="dual-link">Contribute →</span>
        </Link>
      </section>

      {/* Built by — credibility */}
      <section className="builtby reveal-4">
        <p className="eyebrow">Built by</p>
        <p>
          Made by a working BIM engineer for the AEC community, as part of{' '}
          <strong>BIM Insight</strong>. Feedback and contributions keep it growing —{' '}
          <Link to="/share">share a script</Link> or <Link to="/about">read the vision</Link>.
        </p>
      </section>
    </main>
  )
}
