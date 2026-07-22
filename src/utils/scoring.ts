import { questions } from '../data/questions'
import type { Attempt, Category, QuizState } from '../types'

const CATEGORIES: Category[] = ['Revit', 'Navisworks', 'Coordination', 'ISO 19650']

export function buildAttempt(state: QuizState): Attempt {
  const total = state.answers.length
  const score = state.answers.filter((a) => a.correct).length
  const avgTimeMs = total > 0 ? state.answers.reduce((sum, a) => sum + a.timeTakenMs, 0) / total : 0

  const categoryBreakdown = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = { correct: 0, total: 0 }
      return acc
    },
    {} as Record<Category, { correct: number; total: number }>,
  )

  for (const answer of state.answers) {
    const question = questions.find((q) => q.id === answer.questionId)
    if (!question) continue
    categoryBreakdown[question.category].total += 1
    if (answer.correct) categoryBreakdown[question.category].correct += 1
  }

  return {
    id: `${Date.now()}`,
    date: new Date().toISOString(),
    score,
    total,
    accuracy: total > 0 ? score / total : 0,
    avgTimeMs,
    categoryBreakdown,
  }
}
