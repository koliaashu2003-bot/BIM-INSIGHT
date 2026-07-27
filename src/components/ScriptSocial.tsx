import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  addComment,
  averageRating,
  getSocial,
  setRating,
  toggleLike,
  type ScriptSocial as Social,
} from '../utils/socialStore'

function Stars({ value, onRate }: { value: number; onRate?: (n: number) => void }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`star ${n <= Math.round(value) ? 'on' : ''}`}
          onClick={onRate ? () => onRate(n) : undefined}
          disabled={!onRate}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </span>
  )
}

export function ScriptSocial({ scriptId }: { scriptId: string }) {
  const { user } = useAuth()
  const [social, setSocial] = useState<Social>(() => getSocial(scriptId))
  const [text, setText] = useState('')

  const liked = user ? social.likedBy.includes(user.id) : false
  const myRating = user ? social.ratings[user.id] || 0 : 0
  const avg = averageRating(social)

  function onLike() {
    if (!user) return
    setSocial(toggleLike(scriptId, user.id))
  }
  function onRate(n: number) {
    if (!user) return
    setSocial(setRating(scriptId, user.id, n))
  }
  function onComment(e: FormEvent) {
    e.preventDefault()
    if (!user || !text.trim()) return
    setSocial(addComment(scriptId, { authorId: user.id, authorName: user.name, text: text.trim() }))
    setText('')
  }

  return (
    <div className="social">
      <div className="social-bar">
        <button type="button" className={`like ${liked ? 'on' : ''}`} onClick={onLike} disabled={!user}>
          {liked ? '♥' : '♡'} {social.likedBy.length}
        </button>
        <span className="rating-summary">
          <Stars value={user ? myRating || avg : avg} onRate={user ? onRate : undefined} />
          <span className="avg">{avg ? avg.toFixed(1) : '—'}{Object.keys(social.ratings).length ? ` (${Object.keys(social.ratings).length})` : ''}</span>
        </span>
        <span className="comment-count">💬 {social.comments.length}</span>
      </div>

      {!user && (
        <p className="form-note">
          <Link to="/auth">Sign in</Link> to like, rate and comment.
        </p>
      )}

      {user && (
        <form className="comment-form" onSubmit={onComment}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment…"
            aria-label="Add a comment"
          />
          <button type="submit" className="share-btn">Post</button>
        </form>
      )}

      {social.comments.length > 0 && (
        <ul className="comment-list">
          {social.comments.slice().reverse().map((c) => (
            <li key={c.id}>
              <span className="comment-author">{c.authorName}</span>
              <span className="comment-text">{c.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
