import { QUESTION_TIME_SECONDS } from '../data/questions'

export function Timer({ secondsLeft }: { secondsLeft: number }) {
  const pct = (secondsLeft / QUESTION_TIME_SECONDS) * 100
  const urgent = secondsLeft <= 7

  return (
    <div className={`timer ${urgent ? 'timer-urgent' : ''}`} role="timer" aria-live="polite">
      <div className="timer-track">
        <div className="timer-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="timer-label">{secondsLeft}s</span>
    </div>
  )
}
