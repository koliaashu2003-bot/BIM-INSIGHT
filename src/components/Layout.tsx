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

  return (
    <div className="site">
      <nav className="nav">
        <Link className="nav-brand" to="/">
          BIM<span>Insight</span>
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
        </div>
        {user ? (
          <button
            type="button"
            className="hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open account menu"
          >
            <span /><span /><span />
          </button>
        ) : (
          <Link className="btn-primary nav-cta" to="/auth">
            Sign in
          </Link>
        )}
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
