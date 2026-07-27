// Likes / ratings / comments per script, stored in localStorage (this browser only).
const KEY = 'bim:social'

export interface Comment {
  id: string
  authorId: string
  authorName: string
  text: string
  createdAt: string
}

export interface ScriptSocial {
  likedBy: string[] // user ids
  ratings: Record<string, number> // userId -> 1..5
  comments: Comment[]
}

type SocialMap = Record<string, ScriptSocial>

function readAll(): SocialMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

function writeAll(map: SocialMap) {
  localStorage.setItem(KEY, JSON.stringify(map))
}

export function getSocial(scriptId: string): ScriptSocial {
  return readAll()[scriptId] || { likedBy: [], ratings: {}, comments: [] }
}

export function toggleLike(scriptId: string, userId: string): ScriptSocial {
  const map = readAll()
  const s = map[scriptId] || { likedBy: [], ratings: {}, comments: [] }
  s.likedBy = s.likedBy.includes(userId)
    ? s.likedBy.filter((id) => id !== userId)
    : [...s.likedBy, userId]
  map[scriptId] = s
  writeAll(map)
  return s
}

export function setRating(scriptId: string, userId: string, stars: number): ScriptSocial {
  const map = readAll()
  const s = map[scriptId] || { likedBy: [], ratings: {}, comments: [] }
  s.ratings = { ...s.ratings, [userId]: stars }
  map[scriptId] = s
  writeAll(map)
  return s
}

export function addComment(
  scriptId: string,
  comment: Omit<Comment, 'id' | 'createdAt'>,
): ScriptSocial {
  const map = readAll()
  const s = map[scriptId] || { likedBy: [], ratings: {}, comments: [] }
  s.comments = [
    ...s.comments,
    { ...comment, id: `c_${Date.now()}`, createdAt: new Date().toISOString() },
  ]
  map[scriptId] = s
  writeAll(map)
  return s
}

export function averageRating(s: ScriptSocial): number {
  const vals = Object.values(s.ratings)
  if (!vals.length) return 0
  return vals.reduce((a, b) => a + b, 0) / vals.length
}
