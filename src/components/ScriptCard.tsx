import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LibRow } from '../utils/libraryData'
import { downloadRow } from '../utils/libraryData'
import { bumpCount, getCount } from '../utils/downloadsStore'

export function ScriptCard({
  row,
  onDownloaded,
  children,
}: {
  row: LibRow
  onDownloaded?: () => void
  children?: ReactNode
}) {
  const count = getCount(row.id, 0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDownload() {
    setBusy(true)
    setError(null)
    try {
      await downloadRow(row)
      bumpCount(row.id)
      onDownloaded?.()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Download failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className="script-card">
      <div className="meta">
        <span className="tag">{row.category}</span>
        <span className="tag badge-free">{row.isCommunity ? 'Community' : 'Free'}</span>
      </div>
      <h3>
        <Link to={`/library/${row.id}`} className="card-title-link">
          {row.title}
        </Link>
      </h3>
      <p>{row.description}</p>
      <div className="script-meta-line">
        <span className="mini-tag">{row.format}</span>
        {row.dynamoVersion && <span className="mini-tag">Dynamo {row.dynamoVersion}</span>}
        {row.revitVersion && <span className="mini-tag">Revit {row.revitVersion}</span>}
        {row.tags?.map((t) => (
          <span key={t} className="mini-tag">#{t}</span>
        ))}
      </div>
      <div className="script-foot">
        <span className="script-author">
          {count > 0 ? `${count.toLocaleString()} download${count > 1 ? 's' : ''}` : `by ${row.author}`}
        </span>
        <button type="button" className="dl-btn" onClick={handleDownload} disabled={busy}>
          {busy ? 'Downloading…' : '↓ Download'}
        </button>
      </div>
      {error && <p className="form-error" style={{ marginTop: 8 }}>{error}</p>}
      {children}
    </article>
  )
}
