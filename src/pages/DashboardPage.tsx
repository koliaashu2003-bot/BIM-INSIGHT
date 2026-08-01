import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UploadDropzone } from '../components/UploadDropzone'
import { isSupabaseReady } from '../lib/supabaseClient'

export function DashboardPage() {
  const { user } = useAuth()
  const [showUpload, setShowUpload] = useState(false)

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
          <UploadDropzone onUploaded={() => setShowUpload(false)} />
        </section>
      )}

      <p className="fine-print" style={{ marginTop: 32 }}>
        {isSupabaseReady
          ? 'Uploaded scripts are shared with everyone in the community library.'
          : 'Uploading is disabled until the community backend is configured.'}
      </p>
    </main>
  )
}
