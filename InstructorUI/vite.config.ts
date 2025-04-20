// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Import Vite React plugin
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Use the standard Vite React plugin
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      // Keep the alias for cleaner imports from src
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000, 
    // Optional: Proxy API requests to Flask backend during development
    // proxy: {
    //   '/api': { // Example: proxy requests like /api/courses
    //     target: 'http://127.0.0.1:5000', // Your Flask backend
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
    //   },
    // },
  },
  build: {
    outDir: 'dist' // Default Vite output directory
  }
})