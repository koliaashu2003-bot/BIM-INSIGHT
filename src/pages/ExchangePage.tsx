import { useMemo, useState } from 'react'
import type { DynamoScript, ScriptCategory } from '../data/scripts'
import { SCRIPT_CATEGORIES } from '../data/scripts'
import {
  loadAllScripts,
  loadLikedIds,
  saveUserScript,
  slugify,
  toggleLiked,
} from '../utils/exchangeStorage'

type SortKey = 'popular' | 'recent' | 'liked'

function downloadScript(script: DynamoScript) {
  // Produce a minimal, valid-looking .dyn (Dynamo graph) JSON so the download
  // is a real, openable file rather than a placeholder.
  const graph = {
    Uuid: script.id,
    Name: script.title,
    Description: script.description,
    Author: script.author,
    DynamoVersion: script.dynamoVersion,
    Notes: script.notes,
    Snippet: script.snippet,
    Source: 'BIM Insight — Dynamo Exchange',
  }
  const blob = new Blob([JSON.stringify(graph, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${slugify(script.title)}.dyn`
  a.click()
  URL.revokeObjectURL(url)
}

function ScriptCard({
  script,
  liked,
  onToggleLike,
  onDownload,
}: {
  script: DynamoScript
  liked: boolean
  onToggleLike: () => void
  onDownload: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <article className="script-card">
      <div className="script-card-top">
        <span className="category-tag">{script.category}</span>
        <span className="script-meta">v{script.dynamoVersion}</span>
      </div>
      <h3>{script.title}</h3>
      <p className="script-desc">{script.description}</p>

      <ul className="tag-row">
        {script.tags.map((t) => (
          <li key={t}>#{t}</li>
        ))}
      </ul>

      {open && (
        <div className="script-detail">
          <pre className="code-block">
            <code>{script.snippet}</code>
          </pre>
          <p className="script-notes">
            <strong>Notes:</strong> {script.notes}
          </p>
          <p className="script-meta">
            Revit {script.revitVersion} · {script.downloads.toLocaleString()} downloads
          </p>
        </div>
      )}

      <div className="script-card-foot">
        <span className="script-author">by {script.author}</span>
        <div className="script-actions">
          <button
            type="button"
            className={`icon-btn ${liked ? 'icon-btn-active' : ''}`}
            onClick={onToggleLike}
            aria-pressed={liked}
            title="Like this script"
          >
            ♥ {script.likes + (liked ? 1 : 0)}
          </button>
          <button type="button" className="link-btn" onClick={() => setOpen((o) => !o)}>
            {open ? 'Hide' : 'Preview'}
          </button>
          <button type="button" className="btn-primary btn-small" onClick={onDownload}>
            Download
          </button>
        </div>
      </div>
    </article>
  )
}

const EMPTY_FORM = {
  title: '',
  author: '',
  description: '',
  category: 'Automation' as ScriptCategory,
  tags: '',
  dynamoVersion: '2.19',
  revitVersion: '2024–2025',
  snippet: '',
  notes: '',
}

export function ExchangePage() {
  const [scripts, setScripts] = useState<DynamoScript[]>(() => loadAllScripts())
  const [liked, setLiked] = useState<string[]>(() => loadLikedIds())
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ScriptCategory | 'All'>('All')
  const [sort, setSort] = useState<SortKey>('popular')
  const [showUpload, setShowUpload] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [flash, setFlash] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = scripts.filter((s) => {
      const matchesCat = category === 'All' || s.category === category
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.author.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
    list = [...list].sort((a, b) => {
      if (sort === 'recent') return b.date.localeCompare(a.date)
      if (sort === 'liked') return b.likes - a.likes
      return b.downloads - a.downloads
    })
    return list
  }, [scripts, query, category, sort])

  function handleLike(id: string) {
    setLiked(toggleLiked(id))
  }

  function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    const newScript: DynamoScript = {
      id: `${slugify(form.title)}-${Date.now()}`,
      title: form.title.trim(),
      author: form.author.trim() || 'Anonymous',
      description: form.description.trim(),
      category: form.category,
      tags: form.tags
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean),
      dynamoVersion: form.dynamoVersion.trim() || '2.19',
      revitVersion: form.revitVersion.trim() || '2024–2025',
      downloads: 0,
      likes: 0,
      date: new Date().toISOString().slice(0, 10),
      snippet: form.snippet.trim() || '# Add your graph logic here',
      notes: form.notes.trim() || 'No additional notes provided.',
    }
    saveUserScript(newScript)
    setScripts(loadAllScripts())
    setForm(EMPTY_FORM)
    setShowUpload(false)
    setFlash(`“${newScript.title}” published to the Exchange (saved in your browser).`)
    setTimeout(() => setFlash(''), 6000)
  }

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <p className="eyebrow">Dynamo Exchange</p>
        <h1>Share &amp; discover Dynamo scripts</h1>
        <p className="page-lede">
          A community library of Dynamo graphs for Revit — automation, geometry, data, analysis, and
          interoperability. Download what helps, and give back what you build.
        </p>
        <button type="button" className="btn-primary btn-large" onClick={() => setShowUpload((s) => !s)}>
          {showUpload ? 'Close upload form' : '＋ Upload a script'}
        </button>
      </header>

      {flash && <div className="flash">{flash}</div>}

      {showUpload && (
        <form className="upload-card" onSubmit={handleUpload}>
          <h2>Upload a Dynamo script</h2>
          <p className="form-hint">
            Published to this browser so you can preview the flow end-to-end. Wire the submit handler
            to your backend to make uploads global.
          </p>
          <div className="form-grid">
            <label>
              Title *
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Batch Sheet Creator"
              />
            </label>
            <label>
              Your name
              <input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Jane Architect"
              />
            </label>
            <label>
              Category
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ScriptCategory })}
              >
                {SCRIPT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tags (comma-separated)
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="sheets, excel, automation"
              />
            </label>
            <label>
              Dynamo version
              <input
                value={form.dynamoVersion}
                onChange={(e) => setForm({ ...form, dynamoVersion: e.target.value })}
              />
            </label>
            <label>
              Revit version
              <input
                value={form.revitVersion}
                onChange={(e) => setForm({ ...form, revitVersion: e.target.value })}
              />
            </label>
          </div>
          <label className="form-full">
            Description *
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={2}
              placeholder="What does the graph do, and when would you reach for it?"
            />
          </label>
          <label className="form-full">
            Snippet / key logic
            <textarea
              value={form.snippet}
              onChange={(e) => setForm({ ...form, snippet: e.target.value })}
              rows={3}
              placeholder="# A short illustrative snippet of the graph"
            />
          </label>
          <label className="form-full">
            Notes for users
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              placeholder="How to set inputs, gotchas, requirements…"
            />
          </label>
          <button type="submit" className="btn-primary btn-large">
            Publish to Exchange
          </button>
        </form>
      )}

      {/* Controls */}
      <div className="exchange-controls">
        <input
          className="search-input"
          type="search"
          placeholder="Search scripts, tags, authors…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label="Sort scripts"
        >
          <option value="popular">Most downloaded</option>
          <option value="liked">Most liked</option>
          <option value="recent">Newest</option>
        </select>
      </div>

      <div className="chip-filter" role="tablist" aria-label="Filter by category">
        {(['All', ...SCRIPT_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-chip ${category === c ? 'filter-chip-active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="result-count">
        {filtered.length} script{filtered.length === 1 ? '' : 's'}
      </p>

      <div className="script-grid">
        {filtered.map((s) => (
          <ScriptCard
            key={s.id}
            script={s}
            liked={liked.includes(s.id)}
            onToggleLike={() => handleLike(s.id)}
            onDownload={() => downloadScript(s)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No scripts match your search. Try a different term or category.</p>
      )}
    </div>
  )
}
