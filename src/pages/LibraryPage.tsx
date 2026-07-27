import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SCRIPT_CATEGORIES, scripts, type ScriptCategory } from '../data/scripts'
import { loadUploads } from '../utils/uploadsStore'
import { ScriptSocial } from '../components/ScriptSocial'

const BASE = import.meta.env.BASE_URL

interface Row {
  id: string
  title: string
  description: string
  category: string
  language: string
  author: string
  downloads?: number
  href?: string // built-in file
  content?: string // user upload
  fileName?: string
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

  const rows: Row[] = useMemo(() => {
    const builtins: Row[] = scripts.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      category: s.category,
      language: s.language,
      author: s.author,
      downloads: s.downloads,
      href: `${BASE}scripts/${s.file}`,
    }))
    const uploads: Row[] = loadUploads().map((u) => ({
      id: u.id,
      title: u.title,
      description: u.description || 'Community-uploaded Dynamo graph.',
      category: u.category,
      language: '.dyn',
      author: u.authorName,
      content: u.content,
      fileName: u.fileName,
    }))
    return [...uploads, ...builtins]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((s) => {
      const matchesCat = category === 'All' || s.category === category
      const matchesQ =
        !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      return matchesCat && matchesQ
    })
  }, [rows, query, category])

  return (
    <main className="page">
      <p className="eyebrow reveal">Script Library</p>
      <h1 className="section-title reveal">Download Dynamo scripts</h1>
      <p className="section-lede reveal">
        Ready-to-run scripts for Revit. Free during the beta — <Link to="/share">share your own</Link>{' '}
        or <Link to="/auth">sign in</Link> to upload, like, rate and comment.
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
        <button type="button" className={`chip ${category === 'All' ? 'active' : ''}`} onClick={() => setCategory('All')}>
          All
        </button>
        {SCRIPT_CATEGORIES.map((c) => (
          <button key={c} type="button" className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="script-grid reveal-2">
        {filtered.map((s) => (
          <article key={s.id} className="script-card">
            <div className="meta">
              <span className="tag">{s.category}</span>
              <span className="tag badge-free">{s.content ? 'Community' : 'Free'}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <div className="script-foot">
              <span className="script-author">
                {s.language}
                {s.downloads != null ? ` · ${s.downloads.toLocaleString()} downloads` : ` · by ${s.author}`}
              </span>
              {s.href ? (
                <a className="dl-btn" href={s.href} download>↓ Download</a>
              ) : (
                <button type="button" className="dl-btn" onClick={() => downloadContent(s.fileName!, s.content!)}>
                  ↓ Download
                </button>
              )}
            </div>
            <ScriptSocial scriptId={s.id} />
          </article>
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
