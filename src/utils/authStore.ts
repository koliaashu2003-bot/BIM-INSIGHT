// ---------------------------------------------------------------------------
// DEMO auth — client-side only, stored in localStorage. NOT secure and NOT
// shared across devices/users. It exists to prototype the sign-in/up flow.
// Swap for a real provider (e.g. Supabase Auth) before going live. Because of
// that, users are warned not to reuse a real password.
// ---------------------------------------------------------------------------

const USERS_KEY = 'bim:users'
const SESSION_KEY = 'bim:session'

export interface UserProfile {
  id: string
  name: string
  phone?: string
  email: string
  avatarUrl?: string
}

interface StoredUser extends UserProfile {
  passHash: number
  acceptedTermsAt: string
}

// Tiny non-cryptographic hash — enough to avoid storing the raw string in a demo.
function hash(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i)
  return h >>> 0
}

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toProfile(u: StoredUser): UserProfile {
  return { id: u.id, name: u.name, phone: u.phone, email: u.email }
}

export function signUp(input: {
  name: string
  phone: string
  email: string
  password: string
  acceptedTerms: boolean
}): { ok: true; user: UserProfile } | { ok: false; error: string } {
  const email = input.email.trim().toLowerCase()
  if (!input.acceptedTerms) return { ok: false, error: 'Please accept the Terms & Conditions to continue.' }
  if (readUsers().some((u) => u.email === email)) {
    return { ok: false, error: 'An account with this email already exists — try signing in.' }
  }
  const user: StoredUser = {
    id: `u_${Date.now()}`,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email,
    passHash: hash(input.password),
    acceptedTermsAt: new Date().toISOString(),
  }
  const users = readUsers()
  users.push(user)
  writeUsers(users)
  localStorage.setItem(SESSION_KEY, user.id)
  return { ok: true, user: toProfile(user) }
}

export function signIn(
  email: string,
  password: string,
): { ok: true; user: UserProfile } | { ok: false; error: string } {
  const u = readUsers().find((x) => x.email === email.trim().toLowerCase())
  if (!u || u.passHash !== hash(password)) {
    return { ok: false, error: 'Email or password is incorrect.' }
  }
  localStorage.setItem(SESSION_KEY, u.id)
  return { ok: true, user: toProfile(u) }
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY)
}

export function currentUser(): UserProfile | null {
  const id = localStorage.getItem(SESSION_KEY)
  if (!id) return null
  const u = readUsers().find((x) => x.id === id)
  return u ? toProfile(u) : null
}
