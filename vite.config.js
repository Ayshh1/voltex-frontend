import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    // Only use proxy in development mode
    ...(mode === 'development' && {
      server: {
        port: 5173,
        proxy: {
          '/api': {
            target: env.VITE_API_URL || 'http://localhost:5000',
            changeOrigin: true
          },
          '/socket.io': {
            target: env.VITE_SOCKET_URL || 'http://localhost:5000',
            ws: true
          }
        }
      }
    })
  }
})
