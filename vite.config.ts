import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ← добавь эту строку

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ← вот и всё!
    },
  },
  server: {
    proxy: {
      // Все запросы к /auth проксируем на dummyjson.com
      '/auth': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        secure: false, // игнорируем HTTPS сертификат (для dev)
        // rewrite: (path) => path.replace(/^\/auth/, '/auth') // не нужно
      },
    },
  },
});

