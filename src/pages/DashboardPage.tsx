import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UploadDropzone } from '../components/UploadDropzone'
import { AdminQueue } from '../components/AdminQueue'
import { isAdminEmail } from '../config'
import { loadUploads, removeUpload, type UploadedScript } from '../utils/uploadsStore'

const BASE = import.meta.env.BASE_URL

function downloadDyn(u: UploadedScript) {
  const blob = new Blob([u.content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = u.fileName
  a.click()
  URL.revokeObjectURL(url)
}

export function DashboardPage() {
  const { user } = useAuth()
  const [uploads, setUploads] = useState<UploadedScript[]>(() => loadUploads())
  const [showUpload, setShowUpload] = useState(false)

  const mine = user ? uploads.filter((u) => u.authorId === user.id) : []

  return (
    <main className="page">
      <p className="eyebrow reveal">Dashboard</p>
      <h1 className="section-title reveal">Welcome, {user?.name.split(' ')[0]} 👋</h1>
      <p className="section-lede reveal">
        Free beta access. Upload your Dynamo scripts, take the quiz, and browse the community library.
      </p>

      <div className="dash-grid reveal-2">
        <Link to="/quiz" className="dash-tile">
          <div className="feature-ico">🎯</div>
          <h3>Take the quiz</h3>
          <p>29 questions across the AEC stack.</p>
        </Link>
        <Link to="/library" className="dash-tile">
          <div className="feature-ico">📦</div>
          <h3>Script library</h3>
          <p>Browse, download, rate and comment.</p>
        </Link>
        <button type="button" className="dash-tile" onClick={() => setShowUpload((s) => !s)}>
          <div className="feature-ico">⬆</div>
          <h3>Upload a .dyn</h3>
          <p>Share a Dynamo graph with the community.</p>
        </button>
      </div>

      {showUpload && (
        <section className="card form-card reveal" style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 12 }}>Upload a Dynamo script</h3>
          <UploadDropzone onUploaded={() => setUploads(loadUploads())} />
        </section>
      )}

      <section style={{ marginTop: 40 }}>
        <h2 className="section-title" style={{ fontSize: '1.5rem' }}>My scripts</h2>
        {mine.length === 0 ? (
          <p className="section-lede">
            You haven't uploaded any scripts yet. Use the <strong>Upload a .dyn</strong> tile above or the
            menu in the top-right.
          </p>
        ) : (
          <div className="script-grid">
            {mine.map((u) => (
              <article key={u.id} className="script-card">
                <div className="meta">
                  <span className="tag">{u.category}</span>
                  <span className={`tag ${u.status === 'approved' ? 'badge-free' : 'badge-soon'}`}>
                    {u.status === 'approved' ? 'Published' : 'Pending review'}
                  </span>
                </div>
                <h3>{u.title}</h3>
                <p>{u.description || 'No description.'}</p>
                {(u.dynamoVersion || u.revitVersion || u.tags.length > 0) && (
                  <div className="script-meta-line">
                    {u.dynamoVersion && <span className="mini-tag">Dynamo {u.dynamoVersion}</span>}
                    {u.revitVersion && <span className="mini-tag">Revit {u.revitVersion}</span>}
                    {u.tags.map((t) => (
                      <span key={t} className="mini-tag">#{t}</span>
                    ))}
                  </div>
                )}
                <div className="script-foot">
                  <button type="button" className="link-btn" onClick={() => setUploads(removeUpload(u.id))}>
                    Delete
                  </button>
                  <button type="button" className="dl-btn" onClick={() => downloadDyn(u)}>
                    ↓ Download
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {isAdminEmail(user?.email) && <AdminQueue />}

      <p className="fine-print" style={{ marginTop: 24 }}>
        Note: this beta stores your account and uploads in this browser only. Multi-device accounts and
        public sharing arrive with the backend phase. Base path: <code>{BASE}</code>
      </p>
    </main>
  )
}
