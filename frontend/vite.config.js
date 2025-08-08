import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["https://b26aa1d91941.ngrok-free.app"], // wrap in array
  },
  plugins: [react()],
});

