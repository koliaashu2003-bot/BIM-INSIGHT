import { Link, useParams } from 'react-router-dom'
import { getLibraryRow, downloadRow } from '../utils/libraryData'
import { bumpCount, getCount } from '../utils/downloadsStore'
import { ScriptSocial } from '../components/ScriptSocial'
import { useState } from 'react'

export function ScriptDetailPage() {
  const { id = '' } = useParams()
  const row = getLibraryRow(id)
  const [count, setCount] = useState(() => getCount(id, 0))

  if (!row) {
    return (
      <main className="page">
        <h1 className="section-title reveal">Script not found</h1>
        <p className="section-lede reveal">
          This script isn’t in the library. <Link to="/library">Browse all scripts →</Link>
        </p>
      </main>
    )
  }

  function handleDownload() {
    setCount(bumpCount(row!.id))
    downloadRow(row!)
  }

  return (
    <main className="page">
      <p className="eyebrow reveal">
        <Link to="/library">← Script Library</Link>
      </p>

      <div className="detail-head reveal">
        <div>
          <div className="meta" style={{ marginBottom: 10 }}>
            <span className="tag">{row.category}</span>
            <span className="tag badge-free">{row.isCommunity ? 'Community' : 'Free'}</span>
          </div>
          <h1 className="section-title" style={{ marginBottom: 10 }}>{row.title}</h1>
          <p className="section-lede" style={{ marginBottom: 16 }}>{row.description}</p>
          <button type="button" className="btn-primary btn-large" onClick={handleDownload}>
            ↓ Download {row.format.includes('.py') ? '.py' : '.dyn'}
          </button>
        </div>
      </div>

      <div className="detail-grid reveal-2">
        <div className="detail-spec">
          <h3>Details</h3>
          <dl className="profile-list">
            <div><dt>Format</dt><dd>{row.format}</dd></div>
            <div><dt>Author</dt><dd>{row.author}</dd></div>
            {row.dynamoVersion && <div><dt>Dynamo</dt><dd>{row.dynamoVersion}</dd></div>}
            {row.revitVersion && <div><dt>Revit</dt><dd>{row.revitVersion}</dd></div>}
            <div><dt>Downloads</dt><dd>{count.toLocaleString()}</dd></div>
            {row.tags && row.tags.length > 0 && (
              <div><dt>Tags</dt><dd>{row.tags.map((t) => `#${t}`).join(' ')}</dd></div>
            )}
          </dl>
          {!row.isCommunity && (
            <p className="form-note" style={{ marginTop: 12 }}>
              This is a Python-node script — paste it into a Dynamo Python Script node.
            </p>
          )}
        </div>

        <div className="detail-social card" style={{ padding: 20 }}>
          <h3 style={{ marginBottom: 8 }}>Ratings &amp; comments</h3>
          <ScriptSocial scriptId={row.id} />
        </div>
      </div>
    </main>
  )
}
