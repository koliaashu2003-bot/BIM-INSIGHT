import { scripts } from '../data/scripts'
import { listCommunityScripts, publicUrl, type CommunityScript } from '../services/scripts'

const BASE = import.meta.env.BASE_URL

export interface LibRow {
  id: string
  title: string
  description: string
  category: string
  format: string // "Python node (.py)" or ".dyn graph"
  author: string
  isCommunity: boolean
  downloadUrl: string // built-in file path OR Supabase public URL
  fileName: string
  tags?: string[]
  dynamoVersion?: string
  revitVersion?: string
}

/** The bundled starter scripts (always available, no backend needed). */
export function getBuiltinRows(): LibRow[] {
  return scripts.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    category: s.category,
    format: `${s.language} (.py)`,
    author: s.author,
    isCommunity: false,
    downloadUrl: `${BASE}scripts/${s.file}`,
    fileName: s.file,
  }))
}

function communityToRow(s: CommunityScript): LibRow {
  return {
    id: s.id,
    title: s.title,
    description: s.description || 'Community-uploaded Dynamo graph.',
    category: s.category,
    format: '.dyn graph',
    author: s.author_name,
    isCommunity: true,
    downloadUrl: publicUrl(s.file_path),
    fileName: s.file_path.replace(/^\d+-/, ''),
    tags: s.tags ?? undefined,
    dynamoVersion: s.dynamo_version ?? undefined,
    revitVersion: s.revit_version ?? undefined,
  }
}

/** Community uploads (from Supabase) first, then the built-in starter set. */
export async function fetchLibraryRows(): Promise<LibRow[]> {
  const community = await listCommunityScripts()
  return [...community.map(communityToRow), ...getBuiltinRows()]
}

/** Look up a single row by id (used by the detail page). */
export async function fetchLibraryRow(id: string): Promise<LibRow | undefined> {
  const rows = await fetchLibraryRows()
  return rows.find((r) => r.id === id)
}

/** Download any row's file (built-in path or Supabase public URL) as a real file. */
export async function downloadRow(row: LibRow): Promise<void> {
  const res = await fetch(row.downloadUrl)
  if (!res.ok) throw new Error('Download failed. Please try again.')
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = row.fileName || 'script'
  a.click()
  URL.revokeObjectURL(url)
}
