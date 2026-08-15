// @ts-nocheck
// Vite 8 (rolldown-backed) and Vitest have a type mismatch for plugin types.
// This file is purely configuration — @ts-nocheck suppresses the incompatibility.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
