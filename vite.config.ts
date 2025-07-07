import path from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/web_builder/',

  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/shared/styles/_variables.scss" as *;
          @use "@/shared/styles/_mixins.scss" as *;
        `
      }
    }
  }
});