import { scripts } from '../data/scripts'
import { loadApproved } from './uploadsStore'

const BASE = import.meta.env.BASE_URL

export interface LibRow {
  id: string
  title: string
  description: string
  category: string
  format: string // "Python node (.py)" or ".dyn graph"
  author: string
  isCommunity: boolean
  href?: string // built-in file path
  content?: string // user upload text
  fileName?: string
  tags?: string[]
  dynamoVersion?: string
  revitVersion?: string
}

function builtins(): LibRow[] {
  return scripts.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    category: s.category,
    format: `${s.language} (.py)`,
    author: s.author,
    isCommunity: false,
    href: `${BASE}scripts/${s.file}`,
  }))
}

function communityRows(): LibRow[] {
  return loadApproved().map((u) => ({
    id: u.id,
    title: u.title,
    description: u.description || 'Community-uploaded Dynamo graph.',
    category: u.category,
    format: '.dyn graph',
    author: u.authorName,
    isCommunity: true,
    content: u.content,
    fileName: u.fileName,
    tags: u.tags,
    dynamoVersion: u.dynamoVersion,
    revitVersion: u.revitVersion,
  }))
}

/** Community uploads first (freshest), then the built-in starter set. */
export function getLibraryRows(): LibRow[] {
  return [...communityRows(), ...builtins()]
}

export function getLibraryRow(id: string): LibRow | undefined {
  return getLibraryRows().find((r) => r.id === id)
}

export function downloadRow(row: LibRow) {
  if (row.content && row.fileName) {
    const blob = new Blob([row.content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = row.fileName
    a.click()
    URL.revokeObjectURL(url)
  } else if (row.href) {
    const a = document.createElement('a')
    a.href = row.href
    a.download = ''
    a.click()
  }
}
