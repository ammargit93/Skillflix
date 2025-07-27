import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["48ec73884cd5.ngrok-free.app"], // wrap in array
  },
  plugins: [react()],
});

