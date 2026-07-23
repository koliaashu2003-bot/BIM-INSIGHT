import type { DynamoScript } from '../data/scripts'
import { SEED_SCRIPTS } from '../data/scripts'

const USER_SCRIPTS_KEY = 'bim-insight:user-scripts'
const LIKED_KEY = 'bim-insight:liked-scripts'
const NEWSLETTER_KEY = 'bim-insight:newsletter'

/** User-uploaded scripts persisted to this browser. */
export function loadUserScripts(): DynamoScript[] {
  try {
    const raw = localStorage.getItem(USER_SCRIPTS_KEY)
    return raw ? (JSON.parse(raw) as DynamoScript[]) : []
  } catch {
    return []
  }
}

export function saveUserScript(script: DynamoScript): DynamoScript[] {
  const scripts = [script, ...loadUserScripts()]
  localStorage.setItem(USER_SCRIPTS_KEY, JSON.stringify(scripts))
  return scripts
}

/** Seed catalogue plus this browser's uploads, newest-first for user items. */
export function loadAllScripts(): DynamoScript[] {
  return [...loadUserScripts(), ...SEED_SCRIPTS]
}

export function loadLikedIds(): string[] {
  try {
    const raw = localStorage.getItem(LIKED_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function toggleLiked(id: string): string[] {
  const liked = loadLikedIds()
  const next = liked.includes(id) ? liked.filter((x) => x !== id) : [...liked, id]
  localStorage.setItem(LIKED_KEY, JSON.stringify(next))
  return next
}

export function saveNewsletterEmail(email: string): void {
  try {
    const raw = localStorage.getItem(NEWSLETTER_KEY)
    const emails: string[] = raw ? JSON.parse(raw) : []
    if (!emails.includes(email)) {
      emails.push(email)
      localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(emails))
    }
  } catch {
    // storage unavailable — non-fatal
  }
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}
