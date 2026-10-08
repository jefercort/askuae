import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5188, //estoy definiendo el puerto que quiero que se despliegue el FRONTEND
    strictPort: true, //acá obligo que se use el puerto que impuse
  }
})
