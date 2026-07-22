import type { AnswerRecord, Question, QuizPhase } from '../types'
import { TiltCard } from './TiltCard'

interface QuestionCardProps {
  question: Question
  phase: QuizPhase
  lastAnswer?: AnswerRecord
  onSelect: (index: number) => void
  onNext: () => void
}

export function QuestionCard({ question, phase, lastAnswer, onSelect, onNext }: QuestionCardProps) {
  const revealing = phase === 'reveal'

  return (
    <TiltCard className="question-card">
      <span className="category-tag">{question.category}</span>
      <h2 className="question-prompt">{question.prompt}</h2>
      <div className="options-grid">
        {question.options.map((option, i) => {
          let cls = 'option-btn'
          if (revealing) {
            if (i === question.correctIndex) cls += ' option-correct'
            else if (i === lastAnswer?.selectedIndex) cls += ' option-incorrect'
          }
          return (
            <button
              key={i}
              type="button"
              className={cls}
              disabled={revealing}
              onClick={() => onSelect(i)}
            >
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              {option}
            </button>
          )
        })}
      </div>

      {revealing && lastAnswer && (
        <div className={`reveal-panel ${lastAnswer.correct ? 'reveal-correct' : 'reveal-incorrect'}`}>
          <p className="reveal-verdict">
            {lastAnswer.correct ? 'Correct!' : lastAnswer.timedOut ? "Time's up." : 'Not quite.'}
          </p>
          <button type="button" className="btn-primary" onClick={onNext} autoFocus>
            Next →
          </button>
        </div>
      )}
    </TiltCard>
  )
}
