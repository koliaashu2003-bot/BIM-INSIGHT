import { useState } from 'react'
import type { Attempt } from '../types'
import { SITE_URL, linkedinUrl, renderResultImage, shareResultNatively, twitterUrl, whatsappUrl } from '../utils/share'

export function ShareButtons({ attempt }: { attempt: Attempt }) {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  async function handleNativeShare() {
    const shared = await shareResultNatively(attempt)
    if (!shared) await handleCopyLink()
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(SITE_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDownloadImage() {
    setDownloading(true)
    const blob = await renderResultImage(attempt)
    setDownloading(false)
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bim-quiz-result.png'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="share-buttons">
      <p className="share-label">Share your result</p>
      <div className="share-row">
        <a className="share-btn share-whatsapp" href={whatsappUrl(attempt)} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a className="share-btn share-linkedin" href={linkedinUrl()} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="share-btn share-twitter" href={twitterUrl(attempt)} target="_blank" rel="noreferrer">
          X / Twitter
        </a>
        <button type="button" className="share-btn" onClick={handleNativeShare}>
          Share…
        </button>
        <button type="button" className="share-btn" onClick={handleCopyLink}>
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        <button type="button" className="share-btn" onClick={handleDownloadImage} disabled={downloading}>
          {downloading ? 'Rendering…' : 'Download image'}
        </button>
      </div>
    </div>
  )
}
