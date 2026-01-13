import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/preview/pearlmont/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@pages": resolve(__dirname, "src/pages"),
      "@assets": resolve(__dirname, "src/assets"),
      "@css": resolve(__dirname, "src/css"),
      "@data": resolve(__dirname, "src/data"),
      "@chatbot": resolve(__dirname, "src/chatbot"),
      "@context": resolve(__dirname, "src/context"),
      "@store": resolve(__dirname, "src/store"),
      "@sceneUtil": resolve(__dirname, "src/sceneUtil")
    },
  },
})
