import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
require("dotenv").config({ path: "./.env" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: `${process.env.PROXY}${process.env.PORT}`,
        changeOrigin: true,
        secure: false,      
        // pathRewrite: { '/api': '/' },
      },
    },
  },
})
