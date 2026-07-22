import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/BIM-INSIGHT/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
  },
})
