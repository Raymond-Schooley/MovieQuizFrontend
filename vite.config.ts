/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    // Lets `npm run dev` work on its own (no nginx in front) by forwarding
    // API calls straight to the backend. When the app is accessed through
    // the reverse proxy (docker-compose.dev.yml / docker-compose.yml)
    // requests to /api never reach this dev server in the first place, so
    // this proxy is only a fallback for quick standalone iteration.
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_API_PROXY_TARGET ?? 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
