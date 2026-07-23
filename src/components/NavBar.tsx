import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/exchange', label: 'Dynamo Exchange' },
  { to: '/blog', label: 'Blog' },
  { to: '/community', label: 'Community' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/about', label: 'About' },
]

export function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
        <span className="nav-logo" aria-hidden="true">
          ◈
        </span>
        <span>BIM Insight</span>
      </Link>

      <button
        type="button"
        className="nav-burger"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? '✕' : '☰'}
      </button>

      <nav className={`nav-links ${open ? 'nav-links-open' : ''}`}>
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to="/contact" className="nav-cta" onClick={() => setOpen(false)}>
          Get in touch
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}
