# Dynamo AI Script Generator

A small web app that turns a plain-language description into an Autodesk **Dynamo (Revit)** Python-node script or DesignScript, using an LLM via **Groq**.

Frontend is static HTML/CSS/JS; a tiny Express backend holds the API key server-side and proxies requests to Groq, so **the key is never exposed to the browser**.

## ⚠️ Security

- Never hard-code the Groq key or commit a real `.env`. It's read from the `GROQ_API_KEY` environment variable.
- If a key has ever been pasted somewhere public (chat, screenshot, commit), **rotate it** at https://console.groq.com/keys and use the new one.

## Run locally

```bash
cd ai-script-generator
npm install
cp .env.example .env        # then edit .env and paste your GROQ_API_KEY
GROQ_API_KEY=your_key npm start   # or just `npm start` if .env is loaded by your shell
# open http://localhost:8080
```

> Node 20+ is required (uses the built-in `fetch`).

## Deploy to Google Cloud Run (matches the reference app)

```bash
cd ai-script-generator

# 1. Build & push the container (replace PROJECT_ID)
gcloud builds submit --tag gcr.io/PROJECT_ID/dynamo-ai-script-generator

# 2. Deploy, injecting the key as an env var (kept server-side)
gcloud run deploy dynamo-ai-script-generator \
  --image gcr.io/PROJECT_ID/dynamo-ai-script-generator \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars GROQ_API_KEY=your_key,GROQ_MODEL=llama-3.3-70b-versatile
```

For better security, store the key in Secret Manager and use `--set-secrets GROQ_API_KEY=groq-key:latest` instead of `--set-env-vars`.

## Deploy elsewhere

The same code runs on any Node host — **Render**, **Railway**, **Fly.io**, or a Vercel/Netlify Node function. In each case set `GROQ_API_KEY` as an environment variable in the platform's dashboard; do not put it in the repo.

## Configuration

| Env var | Default | Purpose |
|---|---|---|
| `GROQ_API_KEY` | _(required)_ | Your Groq API key |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Groq chat model to use |
| `PORT` | `8080` | Port the server listens on (Cloud Run sets this) |

## Notes

- AI-generated code should always be reviewed and tested in a non-production Revit model.
- This folder is self-contained and independent of the BIM Insight quiz in the repo root.
