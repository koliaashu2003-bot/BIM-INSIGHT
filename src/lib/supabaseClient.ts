import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config'

// True once the project URL + anon key are filled in (config.ts).
export const isSupabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

// Null until configured, so the app degrades gracefully (built-in scripts still
// show; uploading is disabled with a clear message).
export const supabase: SupabaseClient | null = isSupabaseReady
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

// Name of the public Storage bucket that holds the .dyn files.
export const SCRIPTS_BUCKET = 'scripts'
