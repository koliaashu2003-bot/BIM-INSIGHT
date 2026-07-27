import { useEffect, useState } from 'react'
import {
  loadUploads,
  removeUpload,
  setUploadStatus,
  UPLOADS_CHANGED,
  type UploadedScript,
} from '../utils/uploadsStore'

// Minimal moderation queue. Visible only to admin emails (see config.ADMIN_EMAILS).
// This makes the pending -> approved flow actually work end-to-end in the
// prototype. On a real backend, approval runs server-side with admin auth.
export function AdminQueue() {
  const [items, setItems] = useState<UploadedScript[]>(() => loadUploads())
  const pending = items.filter((u) => u.status === 'pending')

  useEffect(() => {
    const refresh = () => setItems(loadUploads())
    window.addEventListener(UPLOADS_CHANGED, refresh)
    window.addEventListener('focus', refresh)
    return () => {
      window.removeEventListener(UPLOADS_CHANGED, refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  function approve(id: string) {
    setItems(setUploadStatus(id, 'approved'))
  }
  function reject(id: string) {
    setItems(removeUpload(id))
  }

  return (
    <section className="card form-card" style={{ marginTop: 32, maxWidth: '100%' }}>
      <div className="drawer-row" style={{ marginBottom: 12 }}>
        <h2 className="section-title" style={{ fontSize: '1.4rem', margin: 0 }}>
          Moderation queue
        </h2>
        <span className="tag badge-soon">{pending.length} pending</span>
      </div>

      {pending.length === 0 ? (
        <p className="section-lede" style={{ margin: 0 }}>Nothing awaiting review. 🎉</p>
      ) : (
        <div className="script-grid">
          {pending.map((u) => (
            <article key={u.id} className="script-card">
              <div className="meta">
                <span className="tag">{u.category}</span>
                <span className="tag badge-soon">Pending</span>
              </div>
              <h3>{u.title}</h3>
              <p>{u.description || 'No description.'}</p>
              <div className="script-meta-line">
                <span className="mini-tag">{u.fileName}</span>
                {u.dynamoVersion && <span className="mini-tag">Dynamo {u.dynamoVersion}</span>}
                {u.revitVersion && <span className="mini-tag">Revit {u.revitVersion}</span>}
                <span className="mini-tag">by {u.authorName}</span>
              </div>
              <div className="script-foot">
                <button type="button" className="link-btn" onClick={() => reject(u.id)}>
                  Reject
                </button>
                <button type="button" className="dl-btn" onClick={() => approve(u.id)}>
                  ✓ Approve
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
