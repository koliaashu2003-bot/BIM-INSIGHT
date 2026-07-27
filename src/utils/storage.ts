import type { Attempt } from '../types'
import { EMAIL_CAPTURE_URL } from '../config'

const HISTORY_KEY = 'bim-quiz:history'
const EMAILS_KEY = 'bim-quiz:emails'

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

// Captures an email. If EMAIL_CAPTURE_URL is configured (e.g. a Formspree
// endpoint), the email is POSTed there so you actually receive it; otherwise
// it falls back to this browser's localStorage only (prototype behaviour).
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

  if (EMAIL_CAPTURE_URL) {
    // Fire-and-forget; Formspree and similar accept JSON.
    fetch(EMAIL_CAPTURE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, source: 'bim-insight-quiz' }),
    }).catch(() => {
      /* offline / blocked — the localStorage copy above still stands */
    })
  }
}

export function hasUnlockedExplanations(): boolean {
  return localStorage.getItem(EMAILS_KEY) !== null
}
