const promptEl = document.getElementById('prompt')
const languageEl = document.getElementById('language')
const generateBtn = document.getElementById('generate')
const statusEl = document.getElementById('status')
const resultEl = document.getElementById('result')
const outputEl = document.getElementById('output')
const copyBtn = document.getElementById('copy')

let lastCode = ''

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    promptEl.value = chip.dataset.example
    promptEl.focus()
  })
})

function escapeHtml(s) {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
}

// Minimal markdown-ish renderer: fenced code blocks + bullet lists + paragraphs.
function renderMarkdown(md) {
  const parts = md.split(/```[a-zA-Z0-9]*\n?/)
  let html = ''
  const codeBlocks = []
  parts.forEach((chunk, i) => {
    if (i % 2 === 1) {
      // code block
      if (!lastCode) lastCode = chunk.trim()
      codeBlocks.push(chunk.replace(/\n$/, ''))
      html += `<pre><code>${escapeHtml(chunk.replace(/\n$/, ''))}</code></pre>`
    } else {
      const lines = chunk.split('\n')
      let inList = false
      for (const line of lines) {
        const t = line.trim()
        if (!t) {
          if (inList) { html += '</ul>'; inList = false }
          continue
        }
        if (/^[-*]\s+/.test(t)) {
          if (!inList) { html += '<ul>'; inList = true }
          html += `<li>${escapeHtml(t.replace(/^[-*]\s+/, ''))}</li>`
        } else {
          if (inList) { html += '</ul>'; inList = false }
          html += `<p>${escapeHtml(t)}</p>`
        }
      }
      if (inList) html += '</ul>'
    }
  })
  // Prefer the first code block as the copy target
  lastCode = codeBlocks[0] || md
  return html
}

async function generate() {
  const prompt = promptEl.value.trim()
  if (!prompt) {
    statusEl.textContent = 'Describe what the script should do first.'
    return
  }

  generateBtn.disabled = true
  lastCode = ''
  statusEl.innerHTML = '<span class="spinner"></span>Generating…'
  resultEl.hidden = true

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, language: languageEl.value }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Request failed')

    outputEl.innerHTML = renderMarkdown(data.content || '')
    resultEl.hidden = false
    statusEl.textContent = `Done · ${data.model || ''}`
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch (err) {
    statusEl.textContent = err.message || 'Something went wrong.'
  } finally {
    generateBtn.disabled = false
  }
}

generateBtn.addEventListener('click', generate)
promptEl.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') generate()
})

copyBtn.addEventListener('click', async () => {
  if (!lastCode) return
  await navigator.clipboard.writeText(lastCode)
  copyBtn.textContent = 'Copied!'
  setTimeout(() => (copyBtn.textContent = 'Copy'), 1500)
})
