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

// Emails allowed to see the moderation queue and approve/reject uploads.
// (In the client prototype this is a convenience gate; real admin auth belongs
// on the backend. Lower-cased for comparison.)
export const ADMIN_EMAILS = ['koliaashu2003@gmail.com']

export function isAdminEmail(email: string | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.trim().toLowerCase())
}
