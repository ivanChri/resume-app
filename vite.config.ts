import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
<<<<<<< HEAD
  resolve:{
    alias:{
      'html2canvas': 'html2canvas-pro'
    }
  }
=======
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
})
