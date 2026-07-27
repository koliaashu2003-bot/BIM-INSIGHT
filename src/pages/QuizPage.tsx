import { useEffect, useMemo, useRef, useState } from 'react'
import { StartScreen } from '../components/StartScreen'
import { QuestionCard } from '../components/QuestionCard'
import { Timer } from '../components/Timer'
import { ProgressBar } from '../components/ProgressBar'
import { ResultScreen } from '../components/ResultScreen'
import { HistoryPanel } from '../components/HistoryPanel'
import { useQuizEngine } from '../hooks/useQuizEngine'
import { buildAttempt } from '../utils/scoring'
import { clearHistory, loadHistory, saveAttempt } from '../utils/storage'
import type { Attempt } from '../types'

export function QuizPage() {
  const { state, currentQuestion, start, selectAnswer, next, restart } = useQuizEngine()
  const [history, setHistory] = useState<Attempt[]>(() => loadHistory())
  const savedIds = useRef<Set<string>>(new Set())

  const attempt = useMemo(() => (state.phase === 'finished' ? buildAttempt(state) : null), [state])

  useEffect(() => {
    if (!attempt || savedIds.current.has(attempt.id)) return
    savedIds.current.add(attempt.id)
    setHistory(saveAttempt(attempt))
  }, [attempt])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (state.phase === 'active' && ['1', '2', '3', '4'].includes(e.key)) {
        selectAnswer(Number(e.key) - 1)
      } else if (state.phase === 'reveal' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [state.phase, selectAnswer, next])

  const lastAnswer = state.answers[state.answers.length - 1]
  const bestAttempt = history.length
    ? [...history].sort((a, b) => b.score / b.total - a.score / a.total)[0]
    : undefined

  return (
    <main className="page">
      <div className="quiz-wrap reveal">
        {state.phase === 'start' && <StartScreen onStart={start} bestAttempt={bestAttempt} />}

        {(state.phase === 'active' || state.phase === 'reveal') && currentQuestion && (
          <>
            <ProgressBar current={state.currentIndex} total={state.questionOrder.length} />
            <Timer secondsLeft={state.secondsLeft} />
            <QuestionCard
              question={currentQuestion}
              phase={state.phase}
              lastAnswer={lastAnswer}
              onSelect={selectAnswer}
              onNext={next}
            />
          </>
        )}

        {state.phase === 'finished' && attempt && (
          <>
            <ResultScreen attempt={attempt} quizState={state} onRestart={restart} />
            <HistoryPanel
              history={history}
              onClear={() => {
                clearHistory()
                setHistory([])
              }}
            />
          </>
        )}
      </div>
    </main>
  )
}
