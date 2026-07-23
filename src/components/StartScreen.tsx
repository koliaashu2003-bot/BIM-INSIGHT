import { CATEGORIES } from '../data/categories'
import { QUESTION_TIME_SECONDS, TOTAL_QUESTIONS } from '../data/questions'
import type { Attempt } from '../types'
import { TiltCard } from './TiltCard'

export function StartScreen({ onStart, bestAttempt }: { onStart: () => void; bestAttempt?: Attempt }) {
  return (
    <TiltCard className="start-card">
      <p className="eyebrow">Free · {TOTAL_QUESTIONS} questions · {QUESTION_TIME_SECONDS}s each</p>
      <h1>The BIM Insight Quiz</h1>
      <p className="lede">
        Test yourself across the software, plugins, and add-ins that run the AEC industry — Revit,
        AutoCAD &amp; Civil 3D, Navisworks, Rhino &amp; Grasshopper, Dynamo, ACC / BIM 360, and more.
      </p>
      <ul className="topic-chips">
        {CATEGORIES.map((c) => (
          <li key={c}>{c}</li>
        ))}
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
