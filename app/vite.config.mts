import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: [
      'node', 
      'turbo-stream'
    ] // fix module type compatibility issue
  },
  publicDir: 'src/views/public',
  build: {
    minify: true,
    rollupOptions: {
      input: {
        home: 'index.html',
        console: 'console/index.html',
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        relativeUrls: true,
        javascriptEnabled: true
      },
    },
  }
})
