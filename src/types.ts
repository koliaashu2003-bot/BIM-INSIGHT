export type Category =
  | 'Revit'
  | 'AutoCAD & Civil 3D'
  | 'Navisworks'
  | 'Rhino & Grasshopper'
  | 'Dynamo'
  | 'ACC & BIM 360'
  | 'Add-ins & Plugins'

export interface Question {
  id: number
  category: Category
  prompt: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: string
}

export interface AnswerRecord {
  questionId: number
  selectedIndex: number | null
  correct: boolean
  timedOut: boolean
  timeTakenMs: number
}

export type QuizPhase = 'start' | 'active' | 'reveal' | 'finished'

export interface QuizState {
  phase: QuizPhase
  questionOrder: number[]
  currentIndex: number
  secondsLeft: number
  answers: AnswerRecord[]
  questionStartedAt: number
}

export interface Attempt {
  id: string
  date: string
  score: number
  total: number
  accuracy: number
  avgTimeMs: number
  categoryBreakdown: Record<Category, { correct: number; total: number }>
}
