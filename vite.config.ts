import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'ignore-figma-assets',
      enforce: 'pre',
      resolveId(source) {
        if (source.startsWith('figma:asset/')) {
          return '\0virtual:figma-asset'
        }
      },
      load(id) {
        if (id === '\0virtual:figma-asset') {
          return 'export default ""'
        }
      }
    }
  ],
  resolve: {
    alias: {
      'sonner@2.0.3': 'sonner'
    }
  }
})
