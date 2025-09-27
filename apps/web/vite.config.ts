import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    global: 'globalThis',
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Force new bundle name to bypass browser cache
        entryFileNames: `assets/[name]-[hash]-NEW.js`,
        chunkFileNames: `assets/[name]-[hash]-NEW.js`,
        assetFileNames: `assets/[name]-[hash]-NEW.[ext]`
      }
    }
  },
});


