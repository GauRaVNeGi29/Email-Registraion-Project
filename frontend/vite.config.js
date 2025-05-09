import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  host: '0.0.0.0', // Allows external devices to connect
  port: 5173,
})
