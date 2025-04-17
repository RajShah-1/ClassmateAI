// vite.config.ts
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node"; // Or your server adapter like @remix-run/express
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path';

installGlobals();

export default defineConfig({
  plugins: [
    remix(), // THIS is the essential Remix plugin handling routing
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'), // Alias for cleaner imports
    },
  },
  server: {
    port: 3000, // Optional: specify dev server port
    // Optional: Add proxy if backend runs separately during dev
    // proxy: {
    //   '/api': { // Example: proxy requests starting with /api
    //     target: 'http://127.0.0.1:5000', // Your backend address
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '') // Remove /api prefix if backend doesn't expect it
    //   }
    // }
  }
});