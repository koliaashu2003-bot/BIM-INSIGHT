import type { ReactNode } from 'react'
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

  function handleDownload() {
    bumpCount(row.id)
    downloadRow(row)
    onDownloaded?.()
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
        <button type="button" className="dl-btn" onClick={handleDownload}>
          ↓ Download
        </button>
      </div>
      {children}
    </article>
  )
}
