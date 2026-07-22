export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100
  return (
    <div className="progress-bar" aria-label={`Question ${current + 1} of ${total}`}>
      <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      <span className="progress-bar-label">
        {current + 1} / {total}
      </span>
    </div>
  )
}
