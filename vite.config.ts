import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Regex to detect and strip out machine-generated trailing version numbers from imports
const stripVersionSuffixPlugin = {
  name: 'strip-version-suffix',
  enforce: 'pre',
  resolveId(source) {
    // Intercepts scoped or standard packages containing @version suffixes (e.g., @radix-ui/react-slot@1.1.2 -> @radix-ui/react-slot)
    if (source.includes('@') && !source.startsWith('figma:')) {
      const parts = source.split('@');
      // Handles scoped packages like @radix-ui/react-slot@1.1.2
      if (source.startsWith('@') && parts.length > 2) {
        return this.resolve(`@${parts[1]}`, undefined, { skipSelf: true });
      } 
      // Handles standard packages like sonner@2.0.3 or next-themes@0.4.6
      if (!source.startsWith('@') && parts.length > 1) {
        return this.resolve(parts[0], undefined, { skipSelf: true });
      }
    }
    return null;
  }
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    stripVersionSuffixPlugin,
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
  ]
})
