import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
    host: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
    global: 'globalThis',
    __DEV__: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    minify: true,
    sourcemap: false,
  },
});


