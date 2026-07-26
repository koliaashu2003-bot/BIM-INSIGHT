import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT || 8080
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

const app = express()
app.use(express.json({ limit: '256kb' }))
app.use(express.static(join(__dirname, 'public')))

app.get('/healthz', (_req, res) => res.json({ ok: true, model: GROQ_MODEL }))

function systemPrompt(language) {
  const target =
    language === 'designscript'
      ? 'Autodesk Dynamo DesignScript (the .ds / code-block language).'
      : 'a Python Script node in Autodesk Dynamo for Revit (CPython3 / IronPython style).'

  return [
    'You are an expert Autodesk Dynamo and Revit API assistant.',
    `Generate a working script for ${target}`,
    'Rules:',
    '- Output ONE fenced code block with the script, then a short bulleted explanation.',
    '- For Python nodes: read inputs from IN, assign results to OUT, and when the Revit API is needed use',
    '  RevitServices (DocumentManager, TransactionManager), Autodesk.Revit.DB, and wrap model changes in a transaction.',
    '- Prefer clear, commented, production-usable code. Do not invent APIs that do not exist.',
    '- If the request is ambiguous, make a reasonable assumption and state it in the explanation.',
  ].join('\n')
}

app.post('/api/generate', async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'Server is missing GROQ_API_KEY. Set it as an environment variable.' })
  }

  const prompt = (req.body?.prompt || '').toString().trim()
  const language = req.body?.language === 'designscript' ? 'designscript' : 'python'
  if (!prompt) return res.status(400).json({ error: 'Please describe what the script should do.' })
  if (prompt.length > 4000) return res.status(400).json({ error: 'Prompt is too long (max 4000 characters).' })

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.3,
        max_tokens: 2048,
        messages: [
          { role: 'system', content: systemPrompt(language) },
          { role: 'user', content: prompt },
        ],
      }),
    })

    if (!groqRes.ok) {
      const detail = await groqRes.text()
      console.error('Groq error', groqRes.status, detail)
      return res.status(502).json({ error: `Upstream error (${groqRes.status}). Check the model name and API key.` })
    }

    const data = await groqRes.json()
    const content = data?.choices?.[0]?.message?.content ?? ''
    res.json({ content, model: GROQ_MODEL })
  } catch (err) {
    console.error('Generate failed', err)
    res.status(500).json({ error: 'Something went wrong generating the script. Please try again.' })
  }
})

app.listen(PORT, () => {
  console.log(`Dynamo AI Script Generator listening on :${PORT} (model: ${GROQ_MODEL})`)
})
