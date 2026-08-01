import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource-variable/fraunces'
import './index.css'
import App from './App.tsx'

// HashRouter (URLs like /BIM-INSIGHT/#/library) so every link works when
// clicked, pasted, shared or refreshed on GitHub Pages — no 404-redirect hack,
// which was unreliable inside in-app browsers (WhatsApp, Instagram, etc.).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
