import { useState } from 'react'
import { questions } from '../data/questions'
import type { Attempt, QuizState } from '../types'
import { hasUnlockedExplanations } from '../utils/storage'
import { EmailGate } from './EmailGate'
import { FeedbackLink } from './FeedbackLink'
import { ShareButtons } from './ShareButtons'
import { TiltCard } from './TiltCard'

function scoreVerdict(pct: number): string {
  if (pct >= 90) return "Site-lead material. You know this cold."
  if (pct >= 70) return 'Solid grasp — a few gaps to close.'
  if (pct >= 50) return 'Decent foundation, more reps needed.'
  return "Time to revisit the fundamentals."
}

export function ResultScreen({
  attempt,
  quizState,
  onRestart,
}: {
  attempt: Attempt
  quizState: QuizState
  onRestart: () => void
}) {
  const [unlocked, setUnlocked] = useState(() => hasUnlockedExplanations())
  const pct = Math.round(attempt.accuracy * 100)

  return (
    <div className="result-screen">
      <TiltCard className="result-card">
        <p className="eyebrow">Quiz complete</p>
        <h1 className="result-score">
          {attempt.score}/{attempt.total}
        </h1>
        <p className="result-pct">{pct}% correct</p>
        <p className="result-verdict">{scoreVerdict(pct)}</p>

        <div className="category-breakdown">
          {Object.entries(attempt.categoryBreakdown).map(([cat, stats]) => (
            <div key={cat} className="category-row">
              <span className="category-name">{cat}</span>
              <div className="category-bar-track">
                <div
                  className="category-bar-fill"
                  style={{ width: `${stats.total > 0 ? (stats.correct / stats.total) * 100 : 0}%` }}
                />
              </div>
              <span className="category-score">
                {stats.correct}/{stats.total}
              </span>
            </div>
          ))}
        </div>

        <ShareButtons attempt={attempt} />

        <div className="result-actions">
          <button type="button" className="btn-primary" onClick={onRestart}>
            Play again
          </button>
          <FeedbackLink variant="button" />
        </div>
      </TiltCard>

      {!unlocked && <EmailGate onUnlock={() => setUnlocked(true)} />}

      {unlocked && (
        <div className="explanations">
          <h3>Full explanations</h3>
          {quizState.answers.map((answer) => {
            const question = questions.find((q) => q.id === answer.questionId)
            if (!question) return null
            return (
              <div key={answer.questionId} className={`explanation-item ${answer.correct ? 'correct' : 'incorrect'}`}>
                <p className="explanation-prompt">{question.prompt}</p>
                <p className="explanation-answer">
                  Correct answer: <strong>{question.options[question.correctIndex]}</strong>
                </p>
                <p className="explanation-text">{question.explanation}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
