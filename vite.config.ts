import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [vue(), visualizer()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://172.10.21.114',
        changeOrigin: true,
      },
      '^/generatePNG': {
        target: 'http://172.10.21.114',
        // target: 'http://172.10.21.103:81/',
      },
    },
  },
})
// rewrite: path => path.replace(/^\/api/, ""),
