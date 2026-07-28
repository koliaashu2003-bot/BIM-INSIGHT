import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SCRIPT_CATEGORIES, type ScriptCategory } from '../data/scripts'
import { UPLOADS_CHANGED } from '../utils/uploadsStore'
import { getLibraryRows, type LibRow } from '../utils/libraryData'
import { ScriptCard } from '../components/ScriptCard'
import { ScriptSocial } from '../components/ScriptSocial'

export function LibraryPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ScriptCategory | 'All'>('All')
  const [rows, setRows] = useState<LibRow[]>(() => getLibraryRows())
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const refresh = () => setRows(getLibraryRows())
    window.addEventListener(UPLOADS_CHANGED, refresh)
    window.addEventListener('focus', refresh)
    return () => {
      window.removeEventListener(UPLOADS_CHANGED, refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((s) => {
      const matchesCat = category === 'All' || s.category === category
      const matchesQ =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.tags || []).some((t) => t.toLowerCase().includes(q))
      return matchesCat && matchesQ
    })
  }, [rows, query, category])

  return (
    <main className="page">
      <p className="eyebrow reveal">Script Library</p>
      <h1 className="section-title reveal">Browse Dynamo scripts &amp; graphs</h1>
      <p className="section-lede reveal">
        Free during the beta — <Link to="/share">share your own</Link> or{' '}
        <Link to="/auth">sign in</Link> to upload, like, rate and comment.
      </p>

      <div className="callout reveal-2" style={{ maxWidth: 760 }}>
        Two formats: <strong>Python-node scripts</strong> (<code>.py</code> — paste into a Dynamo
        Python Script node) and community <strong><code>.dyn</code> graphs</strong> you can open
        directly in Dynamo. Each card shows its format; click a title for full details.
      </div>

      <div className="filter-row reveal-2">
        <input
          className="search"
          type="search"
          placeholder="Search by title, description or tag…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search scripts"
        />
        <button type="button" className={`chip ${category === 'All' ? 'active' : ''}`} onClick={() => setCategory('All')}>
          All
        </button>
        {SCRIPT_CATEGORIES.map((c) => (
          <button key={c} type="button" className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <p className="result-count reveal-2">{filtered.length} script{filtered.length !== 1 ? 's' : ''}</p>

      <div className="script-grid reveal-2" key={tick}>
        {filtered.map((row) => (
          <ScriptCard key={row.id} row={row} onDownloaded={() => setTick((t) => t + 1)}>
            <ScriptSocial scriptId={row.id} />
          </ScriptCard>
        ))}

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
        <p className="section-lede" style={{ marginTop: 24 }}>No scripts match that search yet.</p>
      )}
    </main>
  )
}
