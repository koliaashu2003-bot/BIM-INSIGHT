// Tracks download counts locally so the numbers actually move when a user
// downloads (instead of being static constants in the source).
// NOTE: these are per-browser tallies — real cross-user counts require a
// backend. Built-in scripts are seeded once from their starting value.
const KEY = 'bim:downloads'

function readAll(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

function writeAll(map: Record<string, number>) {
  localStorage.setItem(KEY, JSON.stringify(map))
}

/** Current count for a script, seeding from `seed` the first time it's seen. */
export function getCount(id: string, seed = 0): number {
  const map = readAll()
  return id in map ? map[id] : seed
}

/** Increment on download and persist; returns the new count. */
export function bumpCount(id: string, seed = 0): number {
  const map = readAll()
  const next = (id in map ? map[id] : seed) + 1
  map[id] = next
  writeAll(map)
  return next
}
