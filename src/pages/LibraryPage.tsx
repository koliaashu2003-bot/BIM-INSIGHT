import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SCRIPT_CATEGORIES, scripts, type ScriptCategory } from '../data/scripts'

const BASE = import.meta.env.BASE_URL

export function LibraryPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ScriptCategory | 'All'>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return scripts.filter((s) => {
      const matchesCat = category === 'All' || s.category === category
      const matchesQ =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      return matchesCat && matchesQ
    })
  }, [query, category])

  return (
    <main className="page">
      <p className="eyebrow reveal">Script Library</p>
      <h1 className="section-title reveal">Download Dynamo scripts</h1>
      <p className="section-lede reveal">
        Ready-to-run Python-node scripts for Revit. Free during the beta —{' '}
        <Link to="/share">share your own</Link> to help the community grow.
      </p>

      <div className="filter-row reveal-2">
        <input
          className="search"
          type="search"
          placeholder="Search scripts…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search scripts"
        />
        <button
          type="button"
          className={`chip ${category === 'All' ? 'active' : ''}`}
          onClick={() => setCategory('All')}
        >
          All
        </button>
        {SCRIPT_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="script-grid reveal-2">
        {filtered.map((s) => (
          <article key={s.id} className="script-card">
            <div className="meta">
              <span className="tag">{s.category}</span>
              <span className="tag badge-free">Free</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <div className="script-foot">
              <span className="script-author">
                {s.language} · {s.downloads.toLocaleString()} downloads
              </span>
              <a className="dl-btn" href={`${BASE}scripts/${s.file}`} download>
                ↓ Download
              </a>
            </div>
          </article>
        ))}

        {/* Teaser for the future premium tier */}
        <article className="script-card locked">
          <div className="meta">
            <span className="tag">Premium</span>
            <span className="tag badge-soon">Coming soon</span>
          </div>
          <h3>Interview-prep script pack</h3>
          <p>A curated bundle of advanced, production-tested scripts. Part of the upcoming premium tier.</p>
          <div className="script-foot">
            <span className="script-author">Premium · locked</span>
            <span className="dl-btn">Locked</span>
          </div>
        </article>
      </div>

      {filtered.length === 0 && (
        <p className="section-lede" style={{ marginTop: 24 }}>
          No scripts match that search yet.
        </p>
      )}
    </main>
  )
}
