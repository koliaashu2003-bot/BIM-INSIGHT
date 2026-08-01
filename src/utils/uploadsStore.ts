// .dyn validation helpers. (Script storage now lives in Supabase — see
// src/services/scripts.ts. No more localStorage for scripts.)

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
