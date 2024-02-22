import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5050",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "../build/client_dist" // To whom it may concern: Don't remove this line again thanks :)
  },
  plugins: [react()],
})
