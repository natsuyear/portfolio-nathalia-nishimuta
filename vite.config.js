import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // nome do repositório, para o site funcionar no GitHub Pages
  base: '/portfolio-nathalia-nishimuta/',
})
