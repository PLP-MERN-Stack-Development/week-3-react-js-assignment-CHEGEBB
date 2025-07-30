import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/week-3-react-js-assignment-CHEGEBB/',
  build: {
    outDir: 'dist',
  }
})