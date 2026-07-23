import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand-col">
          <div className="nav-brand footer-brand">
            <span className="nav-logo" aria-hidden="true">
              ◈
            </span>
            <span>BIM Insight</span>
          </div>
          <p className="footer-tag">
            The home for the AEC community to exchange Dynamo scripts, share knowledge, and build
            better together.
          </p>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <Link to="/exchange">Dynamo Exchange</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/community">Community</Link>
          <Link to="/quiz">AEC Quiz</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/exchange">Upload a script</Link>
        </div>

        <div className="footer-col">
          <h4>Disciplines</h4>
          <span className="footer-muted">Architecture</span>
          <span className="footer-muted">Engineering</span>
          <span className="footer-muted">Construction</span>
        </div>
      </div>

      <div className="footer-base">
        <span>© {year} BIM Insight. Built for the AEC community.</span>
        <span>Made with Revit, Dynamo &amp; a lot of coffee.</span>
      </div>
    </footer>
  )
}
