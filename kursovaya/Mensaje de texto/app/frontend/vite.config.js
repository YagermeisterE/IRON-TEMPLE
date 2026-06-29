import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        prices: resolve(__dirname, 'prices.html'),
        trainers: resolve(__dirname, 'trainers.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        contacts: resolve(__dirname, 'contacts.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
});