import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SCRIPT_CATEGORIES, type ScriptCategory } from '../data/scripts'
import { fetchLibraryRows, getBuiltinRows, type LibRow } from '../utils/libraryData'
import { ScriptCard } from '../components/ScriptCard'
import { ScriptSocial } from '../components/ScriptSocial'

export function LibraryPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ScriptCategory | 'All'>('All')
  // Start with the built-in scripts so something shows instantly, then load
  // the shared community scripts from Supabase.
  const [rows, setRows] = useState<LibRow[]>(() => getBuiltinRows())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      setRows(await fetchLibraryRows())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the community library.')
      setRows(getBuiltinRows()) // fall back to built-ins
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    const onFocus = () => void load()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        Free during the beta — <Link to="/share">share your own</Link> to add to the community library.
      </p>

      <div className="callout reveal-2" style={{ maxWidth: 760 }}>
        Two formats: <strong>Python-node scripts</strong> (<code>.py</code> — paste into a Dynamo
        Python Script node) and community <strong><code>.dyn</code> graphs</strong> you can open
        directly in Dynamo. Community uploads are shared with everyone. Click a title for full details.
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

      <p className="result-count reveal-2">
        {loading ? (
          <><span className="spinner" style={{ verticalAlign: '-2px', marginRight: 8 }} />Loading community scripts…</>
        ) : (
          `${filtered.length} script${filtered.length !== 1 ? 's' : ''}`
        )}
      </p>

      {error && (
        <p className="form-error" style={{ marginBottom: 16 }}>
          {error} <button type="button" className="link-btn" onClick={() => void load()}>Retry</button>
        </p>
      )}

      <div className="script-grid reveal-2">
        {filtered.map((row) => (
          <ScriptCard key={row.id} row={row}>
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

      {!loading && filtered.length === 0 && (
        <p className="section-lede" style={{ marginTop: 24 }}>No scripts match that search yet.</p>
      )}
    </main>
  )
}
