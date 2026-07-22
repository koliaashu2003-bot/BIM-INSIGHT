import type { Attempt } from '../types'

const HISTORY_KEY = 'bim-quiz:history'
const EMAILS_KEY = 'bim-quiz:emails'
const THEME_KEY = 'bim-quiz:theme'

export function loadHistory(): Attempt[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? (JSON.parse(raw) as Attempt[]) : []
  } catch {
    return []
  }
}

export function saveAttempt(attempt: Attempt): Attempt[] {
  const history = [attempt, ...loadHistory()].slice(0, 50)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  return history
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY)
}

// Client-only capture: persisted to this browser's localStorage.
// To wire up a real mailing list, POST `email` to your ESP here
// (Mailchimp, ConvertKit, Formspree, etc.) in addition to/instead of this.
export function saveEmail(email: string): void {
  try {
    const raw = localStorage.getItem(EMAILS_KEY)
    const emails: string[] = raw ? JSON.parse(raw) : []
    if (!emails.includes(email)) {
      emails.push(email)
      localStorage.setItem(EMAILS_KEY, JSON.stringify(emails))
    }
  } catch {
    // localStorage unavailable (private mode, quota) — non-fatal, gate still unlocks
  }
}

export function hasUnlockedExplanations(): boolean {
  return localStorage.getItem(EMAILS_KEY) !== null
}

export type ThemeName = 'light' | 'dark'

export function loadTheme(): ThemeName {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function saveTheme(theme: ThemeName): void {
  localStorage.setItem(THEME_KEY, theme)
}
