import { QUESTION_TIME_SECONDS } from '../data/questions'
import type { AnswerRecord, QuizState } from '../types'

export type QuizAction =
  | { type: 'START'; questionOrder: number[]; now: number }
  | { type: 'TICK' }
  | { type: 'SELECT_ANSWER'; selectedIndex: number; correctIndex: number; now: number }
  | { type: 'TIMEOUT'; correctIndex: number }
  | { type: 'NEXT'; now: number; totalQuestions: number }
  | { type: 'RESTART' }

export const initialQuizState: QuizState = {
  phase: 'start',
  questionOrder: [],
  currentIndex: 0,
  secondsLeft: QUESTION_TIME_SECONDS,
  answers: [],
  questionStartedAt: 0,
}

function buildAnswer(
  questionId: number,
  selectedIndex: number | null,
  correctIndex: number,
  timedOut: boolean,
  timeTakenMs: number,
): AnswerRecord {
  return {
    questionId,
    selectedIndex,
    correct: !timedOut && selectedIndex === correctIndex,
    timedOut,
    timeTakenMs,
  }
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return {
        ...initialQuizState,
        phase: 'active',
        questionOrder: action.questionOrder,
        questionStartedAt: action.now,
      }

    case 'TICK': {
      if (state.phase !== 'active') return state
      if (state.secondsLeft <= 1) {
        return { ...state, secondsLeft: 0 }
      }
      return { ...state, secondsLeft: state.secondsLeft - 1 }
    }

    case 'SELECT_ANSWER': {
      if (state.phase !== 'active') return state
      const questionId = state.questionOrder[state.currentIndex]
      const timeTakenMs = action.now - state.questionStartedAt
      const answer = buildAnswer(questionId, action.selectedIndex, action.correctIndex, false, timeTakenMs)
      return {
        ...state,
        phase: 'reveal',
        answers: [...state.answers, answer],
      }
    }

    case 'TIMEOUT': {
      if (state.phase !== 'active') return state
      const questionId = state.questionOrder[state.currentIndex]
      const timeTakenMs = QUESTION_TIME_SECONDS * 1000
      const answer = buildAnswer(questionId, null, action.correctIndex, true, timeTakenMs)
      return {
        ...state,
        phase: 'reveal',
        answers: [...state.answers, answer],
      }
    }

    case 'NEXT': {
      if (state.phase !== 'reveal') return state
      const isLast = state.currentIndex >= action.totalQuestions - 1
      if (isLast) {
        return { ...state, phase: 'finished' }
      }
      return {
        ...state,
        phase: 'active',
        currentIndex: state.currentIndex + 1,
        secondsLeft: QUESTION_TIME_SECONDS,
        questionStartedAt: action.now,
      }
    }

    case 'RESTART':
      return initialQuizState

    default:
      return state
  }
}

export function shuffledOrder(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}
