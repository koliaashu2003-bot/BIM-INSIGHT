import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AccountDrawer } from './AccountDrawer'
import { FeedbackLink } from './FeedbackLink'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/quiz', label: 'Quiz' },
  { to: '/library', label: 'Script Library' },
  { to: '/share', label: 'Share a Script' },
  { to: '/about', label: 'About' },
]

export function Layout() {
  const { user } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  return (
    <div className="site">
      <nav className="nav">
        <Link className="nav-brand" to="/" onClick={close}>
          BIM<span>Insight</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        <div className={`nav-collapse ${menuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={close}>
                {l.label}
              </NavLink>
            ))}
          </div>
          {user ? (
            <button
              type="button"
              className="nav-account"
              onClick={() => { setDrawerOpen(true); close() }}
            >
              Account
            </button>
          ) : (
            <Link className="btn-primary nav-cta" to="/auth" onClick={close}>
              Sign in
            </Link>
          )}
        </div>
      </nav>

      <Outlet />

      <footer className="footer">
        <span>© {new Date().getFullYear()} BIM Insight · Learn &amp; share the AEC software stack.</span>
        <span>
          <Link to="/terms">Terms</Link>
          {' · '}
          <Link to="/share">Share a script</Link>
          {' · '}
          <FeedbackLink variant="footer" />
        </span>
      </footer>

      <AccountDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
