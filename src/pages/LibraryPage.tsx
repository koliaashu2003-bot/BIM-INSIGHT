import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SCRIPT_CATEGORIES, scripts, type ScriptCategory } from '../data/scripts'
import { loadApproved, UPLOADS_CHANGED, type UploadedScript } from '../utils/uploadsStore'
import { bumpCount, getCount } from '../utils/downloadsStore'
import { ScriptSocial } from '../components/ScriptSocial'

const BASE = import.meta.env.BASE_URL

interface Row {
  id: string
  title: string
  description: string
  category: string
  format: string // e.g. "Python node (.py)" or ".dyn graph"
  author: string
  href?: string // built-in file
  content?: string // user upload
  fileName?: string
  tags?: string[]
  dynamoVersion?: string
  revitVersion?: string
}

function toRow(u: UploadedScript): Row {
  return {
    id: u.id,
    title: u.title,
    description: u.description || 'Community-uploaded Dynamo graph.',
    category: u.category,
    format: '.dyn graph',
    author: u.authorName,
    content: u.content,
    fileName: u.fileName,
    tags: u.tags,
    dynamoVersion: u.dynamoVersion,
    revitVersion: u.revitVersion,
  }
}

function downloadContent(fileName: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

export function LibraryPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ScriptCategory | 'All'>('All')
  const [uploads, setUploads] = useState<UploadedScript[]>(() => loadApproved())
  const [countTick, setCountTick] = useState(0) // forces re-render after a download

  // Keep the list in sync when uploads are approved/removed or the tab regains focus.
  useEffect(() => {
    const refresh = () => setUploads(loadApproved())
    window.addEventListener(UPLOADS_CHANGED, refresh)
    window.addEventListener('focus', refresh)
    return () => {
      window.removeEventListener(UPLOADS_CHANGED, refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  const rows: Row[] = useMemo(() => {
    const builtins: Row[] = scripts.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      category: s.category,
      format: `${s.language} (.py)`,
      author: s.author,
      href: `${BASE}scripts/${s.file}`,
    }))
    return [...uploads.map(toRow), ...builtins]
  }, [uploads])

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

  function onDownload(row: Row) {
    bumpCount(row.id)
    setCountTick((t) => t + 1)
    if (!row.href && row.content && row.fileName) downloadContent(row.fileName, row.content)
  }

  return (
    <main className="page">
      <p className="eyebrow reveal">Script Library</p>
      <h1 className="section-title reveal">Dynamo scripts &amp; graphs</h1>
      <p className="section-lede reveal">
        Free during the beta — <Link to="/share">share your own</Link> or{' '}
        <Link to="/auth">sign in</Link> to upload, like, rate and comment.
      </p>

      <div className="callout reveal-2" style={{ maxWidth: 760 }}>
        Two formats: <strong>Python-node scripts</strong> (<code>.py</code> — paste into a Dynamo
        Python Script node) from our starter set, and community <strong><code>.dyn</code> graphs</strong>{' '}
        you can open directly in Dynamo. Each card shows its format.
      </div>

      <div className="filter-row reveal-2">
        <input
          className="search"
          type="search"
          placeholder="Search scripts…"
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

      <div className="script-grid reveal-2" key={countTick}>
        {filtered.map((s) => {
          const count = getCount(s.id, 0)
          return (
            <article key={s.id} className="script-card">
              <div className="meta">
                <span className="tag">{s.category}</span>
                <span className="tag badge-free">{s.content ? 'Community' : 'Free'}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="script-meta-line">
                <span className="mini-tag">{s.format}</span>
                {s.dynamoVersion && <span className="mini-tag">Dynamo {s.dynamoVersion}</span>}
                {s.revitVersion && <span className="mini-tag">Revit {s.revitVersion}</span>}
                {s.tags?.map((t) => (
                  <span key={t} className="mini-tag">#{t}</span>
                ))}
              </div>
              <div className="script-foot">
                <span className="script-author">
                  {count > 0 ? `${count.toLocaleString()} download${count > 1 ? 's' : ''}` : `by ${s.author}`}
                </span>
                {s.href ? (
                  <a className="dl-btn" href={s.href} download onClick={() => onDownload(s)}>
                    ↓ Download
                  </a>
                ) : (
                  <button type="button" className="dl-btn" onClick={() => onDownload(s)}>
                    ↓ Download
                  </button>
                )}
              </div>
              <ScriptSocial scriptId={s.id} />
            </article>
          )
        })}

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
