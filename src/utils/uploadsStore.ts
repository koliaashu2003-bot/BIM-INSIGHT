// Client-side store for user-uploaded .dyn scripts (localStorage, this browser only).
// NOTE: moderation/approval here is a local placeholder. Real per-user ownership,
// storage limits and approval belong on a backend (Firebase/Supabase) with
// security rules — this only models the shape of that data.
const KEY = 'bim:uploads'

export type UploadStatus = 'pending' | 'approved'

export interface UploadedScript {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  dynamoVersion: string
  revitVersion: string
  fileName: string
  content: string // raw .dyn JSON text
  authorId: string
  authorName: string
  status: UploadStatus
  createdAt: string
}

export const UPLOADS_CHANGED = 'bim:uploads-changed'
function notify() {
  window.dispatchEvent(new Event(UPLOADS_CHANGED))
}

export function loadUploads(): UploadedScript[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]') as Partial<UploadedScript>[]
    // Back-fill fields for any items saved by older versions.
    return raw.map(
      (u): UploadedScript => ({
        tags: [],
        dynamoVersion: '',
        revitVersion: '',
        status: 'pending',
        ...u,
      }) as UploadedScript,
    )
  } catch {
    return []
  }
}

export function loadApproved(): UploadedScript[] {
  return loadUploads().filter((u) => u.status === 'approved')
}

export function addUpload(
  u: Omit<UploadedScript, 'id' | 'createdAt' | 'status'>,
): UploadedScript[] {
  const item: UploadedScript = {
    ...u,
    id: `up_${Date.now()}`,
    status: 'pending', // new uploads await moderation before appearing publicly
    createdAt: new Date().toISOString(),
  }
  const all = [item, ...loadUploads()]
  localStorage.setItem(KEY, JSON.stringify(all))
  notify()
  return all
}

export function setUploadStatus(id: string, status: UploadStatus): UploadedScript[] {
  const all = loadUploads().map((u) => (u.id === id ? { ...u, status } : u))
  localStorage.setItem(KEY, JSON.stringify(all))
  notify()
  return all
}

export function removeUpload(id: string): UploadedScript[] {
  const all = loadUploads().filter((u) => u.id !== id)
  localStorage.setItem(KEY, JSON.stringify(all))
  notify()
  return all
}

// ---- .dyn validation ---------------------------------------------------------

export const MAX_DYN_BYTES = 5 * 1024 * 1024 // 5 MB

export function validateDyn(
  fileName: string,
  sizeBytes: number,
  text: string,
): { ok: true } | { ok: false; error: string } {
  if (!fileName.toLowerCase().endsWith('.dyn')) {
    return { ok: false, error: 'Only .dyn files are accepted (Dynamo graph).' }
  }
  if (sizeBytes > MAX_DYN_BYTES) {
    return { ok: false, error: `File is too large (max ${(MAX_DYN_BYTES / 1024 / 1024).toFixed(0)} MB).` }
  }
  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    return {
      ok: false,
      error: 'Not valid JSON. Only Dynamo 2.x .dyn files (JSON) are supported, not older XML graphs.',
    }
  }
  if (typeof json !== 'object' || json === null) {
    return { ok: false, error: "This file doesn't contain a Dynamo graph object." }
  }
  const g = json as Record<string, unknown>
  const hasNodes = Array.isArray(g.Nodes)
  const looksDynamo = hasNodes && ('Uuid' in g || 'View' in g || 'Connectors' in g)
  if (!looksDynamo) {
    return {
      ok: false,
      error: "This doesn't look like a Dynamo graph (expected Nodes plus Uuid/View/Connectors).",
    }
  }
  return { ok: true }
}
