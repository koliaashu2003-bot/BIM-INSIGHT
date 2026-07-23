import { FEEDBACK_FORM_URL } from '../config'

/** Renders a link to the Google feedback form, or nothing if no URL is configured. */
export function FeedbackLink({ variant = 'button' }: { variant?: 'button' | 'footer' }) {
  if (!FEEDBACK_FORM_URL) return null
  return (
    <a
      className={variant === 'button' ? 'share-btn' : 'footer-link'}
      href={FEEDBACK_FORM_URL}
      target="_blank"
      rel="noreferrer"
    >
      💬 Feedback
    </a>
  )
}
