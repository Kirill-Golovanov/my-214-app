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
});
