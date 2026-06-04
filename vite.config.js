import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180, // Cambiado para evitar conflictos con Service Workers previos en 5173/5174
    strictPort: true,
  }
})
