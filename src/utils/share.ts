import type { Attempt } from '../types'

export const SITE_URL = 'https://koliaashu2003-bot.github.io/BIM-INSIGHT/'

export function shareText(attempt: Attempt): string {
  const pct = Math.round(attempt.accuracy * 100)
  return `I scored ${attempt.score}/${attempt.total} (${pct}%) on the BIM Insight Quiz — Revit, AutoCAD, Navisworks, Rhino/Grasshopper, Dynamo, ACC & more. Think you can beat it?`
}

export function whatsappUrl(attempt: Attempt): string {
  const text = `${shareText(attempt)} ${SITE_URL}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function linkedinUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`
}

export function twitterUrl(attempt: Attempt): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText(attempt))}&url=${encodeURIComponent(SITE_URL)}`
}

/** Renders a 1200x630 shareable result card to a PNG blob, drawn entirely with Canvas 2D. */
export function renderResultImage(attempt: Attempt): Promise<Blob | null> {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext('2d')
  if (!ctx) return Promise.resolve(null)

  const gradient = ctx.createLinearGradient(0, 0, 1200, 630)
  gradient.addColorStop(0, '#0f172a')
  gradient.addColorStop(1, '#0f766e')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1200, 630)

  ctx.strokeStyle = 'rgba(94, 234, 212, 0.25)'
  ctx.lineWidth = 1
  for (let x = 0; x < 1200; x += 60) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 630)
    ctx.stroke()
  }
  for (let y = 0; y < 630; y += 60) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(1200, y)
    ctx.stroke()
  }

  ctx.fillStyle = '#5eead4'
  ctx.font = '600 32px system-ui, sans-serif'
  ctx.fillText('BIM INSIGHT QUIZ', 70, 90)

  ctx.fillStyle = '#f8fafc'
  ctx.font = '700 130px system-ui, sans-serif'
  ctx.fillText(`${attempt.score}/${attempt.total}`, 70, 260)

  const pct = Math.round(attempt.accuracy * 100)
  ctx.fillStyle = '#e2e8f0'
  ctx.font = '500 36px system-ui, sans-serif'
  ctx.fillText(`${pct}% accuracy`, 70, 316)

  const categories = Object.entries(attempt.categoryBreakdown)
  let y = 380
  ctx.font = '500 22px system-ui, sans-serif'
  for (const [cat, stats] of categories) {
    ctx.fillStyle = '#94a3b8'
    ctx.fillText(cat, 70, y)
    const barX = 360
    const barW = 240
    ctx.fillStyle = 'rgba(148, 163, 184, 0.25)'
    ctx.fillRect(barX, y - 16, barW, 16)
    ctx.fillStyle = '#5eead4'
    const ratio = stats.total > 0 ? stats.correct / stats.total : 0
    ctx.fillRect(barX, y - 16, barW * ratio, 16)
    ctx.fillStyle = '#e2e8f0'
    ctx.fillText(`${stats.correct}/${stats.total}`, barX + barW + 16, y)
    y += 30
  }

  ctx.fillStyle = '#5eead4'
  ctx.font = '600 26px system-ui, sans-serif'
  ctx.fillText(SITE_URL.replace('https://', ''), 70, 600)

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}

export async function shareResultNatively(attempt: Attempt): Promise<boolean> {
  if (!navigator.share) return false
  try {
    const blob = await renderResultImage(attempt)
    const files = blob ? [new File([blob], 'bim-quiz-result.png', { type: 'image/png' })] : undefined
    if (files && navigator.canShare?.({ files })) {
      await navigator.share({ title: 'BIM Insight Quiz', text: shareText(attempt), url: SITE_URL, files })
    } else {
      await navigator.share({ title: 'BIM Insight Quiz', text: shareText(attempt), url: SITE_URL })
    }
    return true
  } catch {
    return false
  }
}
