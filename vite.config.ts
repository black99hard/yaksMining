import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'logo.png'],
      manifest: {
        name: 'Yaks Mining',
        short_name: 'YaksMining',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#ff0000',
        description: 'A mining app that allows users to mine and earn rewards.',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});