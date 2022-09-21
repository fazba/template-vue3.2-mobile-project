import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteVConsole } from 'vite-plugin-vconsole'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    viteVConsole({
      entry: path.resolve('src/main.ts'),
      localEnabled: true,
      enabled: true,
      config: {
        maxLogNumber: 1000,
        theme: 'dark',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
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
