import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    cssCodeSplit: false,
    rollupOptions: {}
  },
  optimizeDeps: {
    include: [
      'vue'
    ]
  },
  plugins: [
    vue()
  ]
});