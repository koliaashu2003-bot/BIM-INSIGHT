import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { initialQuizState, quizReducer } from '../state/quizReducer'
import { prepareQuiz, type PreparedQuestion } from '../utils/prepare'

export function useQuizEngine() {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState)
  const [prepared, setPrepared] = useState<PreparedQuestion[]>([])
  const timeoutFired = useRef(false)

  const currentQuestion = state.phase !== 'start' ? prepared[state.currentIndex] : undefined

  useEffect(() => {
    if (state.phase !== 'active') return
    const id = window.setInterval(() => dispatch({ type: 'TICK' }), 1000)
    return () => window.clearInterval(id)
  }, [state.phase, state.currentIndex])

  useEffect(() => {
    if (state.phase === 'active') timeoutFired.current = false
    if (state.phase === 'active' && state.secondsLeft === 0 && !timeoutFired.current && currentQuestion) {
      timeoutFired.current = true
      dispatch({ type: 'TIMEOUT', correctIndex: currentQuestion.correctIndex })
    }
  }, [state.phase, state.secondsLeft, currentQuestion])

  const start = useCallback(() => {
    const preparedQuiz = prepareQuiz()
    setPrepared(preparedQuiz)
    dispatch({ type: 'START', questionOrder: preparedQuiz.map((q) => q.id), now: Date.now() })
  }, [])

  const selectAnswer = useCallback(
    (selectedIndex: number) => {
      if (!currentQuestion) return
      dispatch({ type: 'SELECT_ANSWER', selectedIndex, correctIndex: currentQuestion.correctIndex, now: Date.now() })
    },
    [currentQuestion],
  )

  const next = useCallback(() => {
    dispatch({ type: 'NEXT', now: Date.now(), totalQuestions: state.questionOrder.length })
  }, [state.questionOrder.length])

  const restart = useCallback(() => {
    setPrepared([])
    dispatch({ type: 'RESTART' })
  }, [])

  return { state, currentQuestion, start, selectAnswer, next, restart }
}
