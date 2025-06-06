// main-frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api/* to our backend on port 3005
      "/api": {
        target: "http://localhost:3005",
        changeOrigin: true,
      },
    },
  },
});
