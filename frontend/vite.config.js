import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/newevent': 'http://localhost:3000',
      '/allevents': 'http://localhost:3000'
    }
  }
})
