import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { TOTAL_QUESTIONS } from '../data/questions'
import { scripts } from '../data/scripts'
import { useAuth } from '../context/AuthContext'

const Scene3D = lazy(() => import('../components/Scene3D').then((m) => ({ default: m.Scene3D })))

export function HomePage() {
  const { user } = useAuth()
  const totalDownloads = scripts.reduce((n, s) => n + s.downloads, 0)

  return (
    <main className="page">
      <section className="hero">
        <div className="reveal">
          <p className="eyebrow">Learn · Build · Share</p>
          <h1>
            The home for <em>Dynamo</em> scripts &amp; BIM know-how.
          </h1>
          <p>
            Test your grip on the AEC software stack, then browse a growing library of ready-to-run
            Dynamo scripts — download what you need, share what you build, from anywhere in the world.
          </p>
          <div className="hero-cta">
            {user ? (
              <Link className="btn-primary btn-large" to="/dashboard">
                Go to dashboard →
              </Link>
            ) : (
              <Link className="btn-primary btn-large" to="/auth">
                Create free account →
              </Link>
            )}
            <Link className="btn-ghost" to="/quiz">
              Take the quiz
            </Link>
          </div>
        </div>
        <div className="hero-art reveal-2" aria-hidden="true">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>
      </section>

      <section className="stat-row reveal-2">
        <div className="stat">
          <div className="stat-num">{TOTAL_QUESTIONS}</div>
          <div className="stat-label">Quiz questions across 7 tools</div>
        </div>
        <div className="stat">
          <div className="stat-num">{scripts.length}</div>
          <div className="stat-label">Scripts in the library</div>
        </div>
        <div className="stat">
          <div className="stat-num">{totalDownloads.toLocaleString()}</div>
          <div className="stat-label">Downloads &amp; counting</div>
        </div>
        <div className="stat">
          <div className="stat-num">Free</div>
          <div className="stat-label">During the beta</div>
        </div>
      </section>

      <section className="reveal-3">
        <p className="eyebrow">Why it exists</p>
        <h2 className="section-title">One place to level up and to ship faster</h2>
        <p className="section-lede">
          BIM Insight brings together the two things every AEC professional needs: sharpening your
          knowledge, and reusing proven automation instead of rebuilding it.
        </p>
        <div className="feature-grid">
          <div className="feature">
            <div className="feature-ico">🎯</div>
            <h3>Timed quiz</h3>
            <p>29 questions on Revit, AutoCAD, Navisworks, Rhino/Grasshopper, Dynamo, ACC &amp; add-ins.</p>
          </div>
          <div className="feature">
            <div className="feature-ico">📦</div>
            <h3>Script library</h3>
            <p>Download Dynamo Python-node scripts for documentation, data, modeling and QA.</p>
          </div>
          <div className="feature">
            <div className="feature-ico">🌍</div>
            <h3>Share worldwide</h3>
            <p>Built something useful? Submit it so peers in any country can put it to work.</p>
          </div>
          <div className="feature">
            <div className="feature-ico">✨</div>
            <h3>Free now, premium later</h3>
            <p>Everything is free during the beta. A curated premium tier is on the roadmap.</p>
          </div>
        </div>
      </section>

      <section className="cta-band reveal-4">
        <h2>Ready to test yourself?</h2>
        <p>Five minutes, 29 questions, instant score with a shareable card.</p>
        <Link className="btn-primary btn-large" to="/quiz">
          Start the quiz
        </Link>
      </section>
    </main>
  )
}
