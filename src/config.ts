// Paste your Google Form URL here to switch on the "Feedback" option
// (footer + results screen). Leave empty to hide it.
export const FEEDBACK_FORM_URL = ''

// Where "Share a script" submissions go.
// - If SUBMIT_FORM_URL is set (a Google Form / Formspree URL), the Share page links to it.
// - Otherwise the form composes a pre-filled email to SUBMIT_EMAIL (works with no backend).
export const SUBMIT_FORM_URL = ''
export const SUBMIT_EMAIL = 'koliaashu2003@gmail.com'

// Set to a Formspree (or similar) endpoint to actually RECEIVE captured emails
// from the quiz's "unlock explanations" gate. Empty = localStorage only.
// e.g. 'https://formspree.io/f/xxxxxxx'
export const EMAIL_CAPTURE_URL = ''

// --- Supabase (enables the "Continue with Google" button) -----------------
// Create a free project at supabase.com, enable the Google provider, then paste
// your Project URL and the anon PUBLIC key here (the anon key is safe to commit).
// Until both are filled in, email/password sign-in still works but the Google
// button stays disabled with a "setup pending" note.
export const SUPABASE_URL = ''
export const SUPABASE_ANON_KEY = ''

// Emails allowed to see the moderation queue and approve/reject uploads.
// (In the client prototype this is a convenience gate; real admin auth belongs
// on the backend. Lower-cased for comparison.)
export const ADMIN_EMAILS = ['koliaashu2003@gmail.com']

export function isAdminEmail(email: string | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.trim().toLowerCase())
}
