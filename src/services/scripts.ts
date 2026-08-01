import { supabase, SCRIPTS_BUCKET } from '../lib/supabaseClient'

// A community-uploaded script row (matches the `scripts` table).
export interface CommunityScript {
  id: string
  title: string
  description: string
  category: string
  author_name: string
  dynamo_version: string | null
  revit_version: string | null
  tags: string[] | null
  file_path: string
  created_at: string
}

export interface UploadInput {
  file: File
  title: string
  description: string
  category: string
  authorName: string
  dynamoVersion?: string
  revitVersion?: string
  tags?: string[]
}

/** Fetch all community scripts, newest first. */
export async function listCommunityScripts(): Promise<CommunityScript[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('scripts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []) as CommunityScript[]
}

/** Public download URL for a stored .dyn file. */
export function publicUrl(filePath: string): string {
  if (!supabase) return ''
  return supabase.storage.from(SCRIPTS_BUCKET).getPublicUrl(filePath).data.publicUrl
}

/** Upload a .dyn file to Storage, then insert its metadata row. */
export async function uploadCommunityScript(input: UploadInput): Promise<CommunityScript> {
  if (!supabase) throw new Error('The script backend is not configured yet.')

  const safeName = input.file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path = `${Date.now()}-${safeName}`

  const upload = await supabase.storage.from(SCRIPTS_BUCKET).upload(path, input.file, {
    contentType: 'application/json',
    upsert: false,
  })
  if (upload.error) throw new Error(`Upload failed: ${upload.error.message}`)

  const row = {
    title: input.title,
    description: input.description,
    category: input.category,
    author_name: input.authorName,
    dynamo_version: input.dynamoVersion || null,
    revit_version: input.revitVersion || null,
    tags: input.tags && input.tags.length ? input.tags : null,
    file_path: path,
  }

  const insert = await supabase.from('scripts').insert(row).select().single()
  if (insert.error) {
    // Roll back the orphaned file if the metadata insert fails.
    await supabase.storage.from(SCRIPTS_BUCKET).remove([path])
    throw new Error(`Could not save script details: ${insert.error.message}`)
  }
  return insert.data as CommunityScript
}
