export type ScriptCategory =
  | 'Documentation'
  | 'Modeling'
  | 'Data'
  | 'QA / Audit'
  | 'MEP'

export interface ScriptItem {
  id: string
  title: string
  description: string
  author: string
  country: string
  category: ScriptCategory
  language: 'Python node' | 'DesignScript'
  file: string // relative to public/scripts/
  premium?: boolean
}

// Starter library of Dynamo Python-node scripts (paste into a Python Script
// node). Files live in public/scripts/ and are served at <BASE_URL>scripts/<file>.
// Download counts are tracked live in downloadsStore, not baked in here.
export const scripts: ScriptItem[] = [
  {
    id: 'rename-views',
    title: 'Batch rename views by type',
    description: 'Prefixes every view name with its view type, wrapped in a single transaction. Great for tidying a messy browser.',
    author: 'BIM Insight',
    country: 'IN',
    category: 'Documentation',
    language: 'Python node',
    file: 'rename-views.py',
  },
  {
    id: 'rooms-to-list',
    title: 'Export room data',
    description: 'Collects all placed rooms and returns Name, Number, Level and Area — ready to push to Excel or a schedule.',
    author: 'BIM Insight',
    country: 'IN',
    category: 'Data',
    language: 'Python node',
    file: 'rooms-to-list.py',
  },
  {
    id: 'place-family-at-grids',
    title: 'Place family at grid intersections',
    description: 'Finds every intersection of the model grids and places a chosen family instance at each point.',
    author: 'BIM Insight',
    country: 'IN',
    category: 'Modeling',
    language: 'Python node',
    file: 'place-family-at-grids.py',
  },
  {
    id: 'set-wall-comments',
    title: 'Tag walls on active level',
    description: 'Sets the Comments parameter on every wall of the active level — a simple, safe transaction pattern to learn from.',
    author: 'BIM Insight',
    country: 'IN',
    category: 'Data',
    language: 'Python node',
    file: 'set-wall-comments.py',
  },
  {
    id: 'sheet-index',
    title: 'Build a sheet index',
    description: 'Reads all sheets and outputs sheet number + name as a sorted list for a drawing register.',
    author: 'BIM Insight',
    country: 'IN',
    category: 'Documentation',
    language: 'Python node',
    file: 'sheet-index.py',
  },
  {
    id: 'unused-view-audit',
    title: 'Find views not on sheets',
    description: 'Audits the model for views that are not placed on any sheet — handy before a purge.',
    author: 'BIM Insight',
    country: 'IN',
    category: 'QA / Audit',
    language: 'Python node',
    file: 'unused-view-audit.py',
  },
]

export const SCRIPT_CATEGORIES: ScriptCategory[] = [
  'Documentation',
  'Modeling',
  'Data',
  'QA / Audit',
  'MEP',
]
