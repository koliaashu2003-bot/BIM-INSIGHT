import type { Attempt } from '../types'

export function HistoryPanel({ history, onClear }: { history: Attempt[]; onClear: () => void }) {
  if (history.length === 0) return null

  const sorted = [...history].sort((a, b) => b.score / b.total - a.score / a.total)

  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>Your history on this device</h3>
        <button type="button" className="link-btn" onClick={onClear}>
          Clear
        </button>
      </div>
      <ol className="history-list">
        {sorted.slice(0, 10).map((attempt, i) => (
          <li key={attempt.id} className="history-row">
            <span className="history-rank">#{i + 1}</span>
            <span className="history-score">
              {attempt.score}/{attempt.total}
            </span>
            <span className="history-date">{new Date(attempt.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ol>
      <p className="fine-print">Stored locally in this browser only — not shared with anyone.</p>
    </div>
  )
}
