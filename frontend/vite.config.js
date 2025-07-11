import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: 'http://localhost:5173/current', // 👈 Force full URL
  },
})
