import { QUESTION_TIME_SECONDS, TOTAL_QUESTIONS } from '../data/questions'
import type { Attempt } from '../types'
import { TiltCard } from './TiltCard'

export function StartScreen({ onStart, bestAttempt }: { onStart: () => void; bestAttempt?: Attempt }) {
  return (
    <TiltCard className="start-card">
      <p className="eyebrow">Free · {TOTAL_QUESTIONS} questions · {QUESTION_TIME_SECONDS}s each</p>
      <h1>The BIM Insight Quiz</h1>
      <p className="lede">
        Test yourself on Revit, Navisworks, coordination workflows, and ISO 19650 — the stuff that
        actually comes up in interviews and on-site coordination meetings.
      </p>
      <ul className="topic-chips">
        <li>Revit</li>
        <li>Navisworks</li>
        <li>BIM Coordination</li>
        <li>ISO 19650</li>
      </ul>
      {bestAttempt && (
        <p className="best-score">
          Your best score: <strong>{bestAttempt.score}/{bestAttempt.total}</strong>
        </p>
      )}
      <button type="button" className="btn-primary btn-large" onClick={onStart}>
        Start Quiz
      </button>
      <p className="fine-print">
        Score {'>'}70%? Unlock full explanations for every question with your email at the end.
      </p>
    </TiltCard>
  )
}
