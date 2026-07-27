import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UploadDropzone } from './UploadDropzone'

export function AccountDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [showUpload, setShowUpload] = useState(false)

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  function handleSignOut() {
    signOut()
    onClose()
    navigate('/')
  }

  return (
    <>
      <div className={`drawer-scrim ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <div className="avatar">{initials}</div>
          <div>
            <div className="drawer-name">{user.name}</div>
            <div className="drawer-sub">{user.email}</div>
          </div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="drawer-section">
          <h4>Profile</h4>
          <dl className="profile-list">
            <div><dt>Name</dt><dd>{user.name}</dd></div>
            <div><dt>Phone</dt><dd>{user.phone || '—'}</dd></div>
            <div><dt>Email</dt><dd>{user.email}</dd></div>
          </dl>
        </div>

        <div className="drawer-section">
          <div className="drawer-row">
            <h4>Upload a script</h4>
            <button type="button" className="link-btn" onClick={() => setShowUpload((s) => !s)}>
              {showUpload ? 'Hide' : 'Add .dyn'}
            </button>
          </div>
          {showUpload && <UploadDropzone onUploaded={onClose} />}
        </div>

        <div className="drawer-section">
          <Link to="/dashboard" className="drawer-link" onClick={onClose}>Go to dashboard →</Link>
          <Link to="/library" className="drawer-link" onClick={onClose}>Browse scripts →</Link>
        </div>

        <button type="button" className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSignOut}>
          Sign out
        </button>
      </aside>
    </>
  )
}
