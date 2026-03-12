import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        overlay: resolve(__dirname, 'overlay.html'),
        overlay_macos: resolve(__dirname, 'overlay-macos.html'),
      },
    },
  },
  base: './', // Ensure relative paths for OBS compatibility
});
