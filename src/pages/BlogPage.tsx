import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SEED_POSTS } from '../data/blog'
import { formatDate } from '../utils/format'

export function BlogPage() {
  const [active, setActive] = useState('All')

  const categories = useMemo(() => {
    const set = new Set(SEED_POSTS.map((p) => p.category))
    return ['All', ...Array.from(set)]
  }, [])

  const posts = useMemo(() => {
    const list = active === 'All' ? SEED_POSTS : SEED_POSTS.filter((p) => p.category === active)
    return [...list].sort((a, b) => b.date.localeCompare(a.date))
  }, [active])

  const [featured, ...rest] = posts

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <p className="eyebrow">Insight Blog</p>
        <h1>Field notes from the AEC frontline</h1>
        <p className="page-lede">
          Practical writing on BIM management, computational design, coordination, and the craft of
          building information — by people who do it every day.
        </p>
      </header>

      <div className="chip-filter">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-chip ${active === c ? 'filter-chip-active' : ''}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <Link to={`/blog/${featured.slug}`} className="blog-featured">
          <span className="blog-emoji" aria-hidden="true">
            {featured.emoji}
          </span>
          <div>
            <div className="blog-badges">
              <span className="category-tag">{featured.category}</span>
              <span className="script-meta">{featured.readingMinutes} min read</span>
            </div>
            <h2>{featured.title}</h2>
            <p className="blog-excerpt">{featured.excerpt}</p>
            <p className="blog-byline">
              {featured.author} · {featured.role} · {formatDate(featured.date)}
            </p>
          </div>
        </Link>
      )}

      <div className="blog-grid">
        {rest.map((p) => (
          <Link key={p.id} to={`/blog/${p.slug}`} className="blog-card">
            <span className="blog-emoji" aria-hidden="true">
              {p.emoji}
            </span>
            <div className="blog-badges">
              <span className="category-tag">{p.category}</span>
              <span className="script-meta">{p.readingMinutes} min</span>
            </div>
            <h3>{p.title}</h3>
            <p className="blog-excerpt">{p.excerpt}</p>
            <p className="blog-byline">
              {p.author} · {formatDate(p.date)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
