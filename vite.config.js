// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('@tailwindcss/postcss')(),
        require('autoprefixer')(),
      ],
    },
  },
  server: {
    proxy: {
      '/api': 'https://chat-app-mern-i2ao.onrender.com0',
      '/uploads': 'https://chat-app-mern-i2ao.onrender.com',
    },
  },
});
