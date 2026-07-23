import { questions } from '../data/questions'
import type { Question } from '../types'
import { shuffledOrder } from '../state/quizReducer'

/**
 * A question whose options have been re-ordered at runtime, with `correctIndex`
 * pointing at wherever the correct option landed. This removes any positional
 * pattern in the correct answer (it isn't always "A") and varies every play.
 */
export type PreparedQuestion = Omit<Question, 'options'> & { options: string[] }

function shuffleOptions(question: Question): PreparedQuestion {
  const order = shuffledOrder(question.options.length)
  const options = order.map((i) => question.options[i])
  const correctIndex = order.indexOf(question.correctIndex) as 0 | 1 | 2 | 3
  return { ...question, options, correctIndex }
}

/** Shuffle the question order, then shuffle each question's options. */
export function prepareQuiz(): PreparedQuestion[] {
  return shuffledOrder(questions.length).map((i) => shuffleOptions(questions[i]))
}
