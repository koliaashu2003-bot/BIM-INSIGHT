import { useCallback, useEffect, useReducer, useRef } from 'react'
import { questions } from '../data/questions'
import { initialQuizState, quizReducer, shuffledOrder } from '../state/quizReducer'

export function useQuizEngine() {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState)
  const timeoutFired = useRef(false)

  const currentQuestion =
    state.phase !== 'start' ? questions[state.questionOrder[state.currentIndex]] : undefined

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
    dispatch({ type: 'START', questionOrder: shuffledOrder(questions.length), now: Date.now() })
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

  const restart = useCallback(() => dispatch({ type: 'RESTART' }), [])

  return { state, currentQuestion, start, selectAnswer, next, restart }
}
