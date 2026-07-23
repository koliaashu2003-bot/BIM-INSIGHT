import { Link, useParams } from 'react-router-dom'
import { SEED_POSTS } from '../data/blog'
import { formatDate } from '../utils/format'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = SEED_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="page page-narrow">
        <div className="page-head">
          <h1>Post not found</h1>
          <p className="page-lede">That article does not exist or has moved.</p>
          <Link to="/blog" className="btn-primary btn-large">
            Back to the blog
          </Link>
        </div>
      </div>
    )
  }

  const related = SEED_POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2)

  return (
    <div className="page page-narrow">
      <article className="post">
        <Link to="/blog" className="back-link">
          ← All articles
        </Link>
        <div className="blog-badges">
          <span className="category-tag">{post.category}</span>
          <span className="script-meta">{post.readingMinutes} min read</span>
        </div>
        <h1 className="post-title">
          <span className="blog-emoji-inline" aria-hidden="true">
            {post.emoji}
          </span>
          {post.title}
        </h1>
        <p className="post-byline">
          By <strong>{post.author}</strong> · {post.role} · {formatDate(post.date)}
        </p>

        <div className="post-body">
          {post.body.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>
            if (block.type === 'quote') return <blockquote key={i}>{block.text}</blockquote>
            if (block.type === 'list')
              return (
                <ul key={i}>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )
            return <p key={i}>{block.text}</p>
          })}
        </div>

        <div className="post-share">
          <span>Share:</span>
          <a
            className="share-btn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              window.location.href,
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="share-btn"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.title,
            )}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noreferrer"
          >
            X / Twitter
          </a>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Keep reading</h2>
          </div>
          <div className="blog-grid">
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="blog-card">
                <span className="blog-emoji" aria-hidden="true">
                  {p.emoji}
                </span>
                <h3>{p.title}</h3>
                <p className="blog-excerpt">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
