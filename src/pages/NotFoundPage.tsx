import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page page-narrow">
      <div className="page-head notfound">
        <p className="eyebrow">404</p>
        <h1>This view has no elements</h1>
        <p className="page-lede">
          The page you are looking for was moved, deleted, or never modelled. Let us get you back on
          plan.
        </p>
        <Link to="/" className="btn-primary btn-large">
          Back home
        </Link>
      </div>
    </div>
  )
}
