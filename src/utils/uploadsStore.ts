// Client-side store for user-uploaded .dyn scripts (localStorage, this browser only).
const KEY = 'bim:uploads'

export interface UploadedScript {
  id: string
  title: string
  description: string
  category: string
  fileName: string
  content: string // raw .dyn text
  authorId: string
  authorName: string
  createdAt: string
}

export function loadUploads(): UploadedScript[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function addUpload(u: Omit<UploadedScript, 'id' | 'createdAt'>): UploadedScript[] {
  const item: UploadedScript = { ...u, id: `up_${Date.now()}`, createdAt: new Date().toISOString() }
  const all = [item, ...loadUploads()]
  localStorage.setItem(KEY, JSON.stringify(all))
  return all
}

export function removeUpload(id: string): UploadedScript[] {
  const all = loadUploads().filter((u) => u.id !== id)
  localStorage.setItem(KEY, JSON.stringify(all))
  return all
}
