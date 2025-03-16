import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Custom startup logger
const customLogger = {
  hasWarned: false,
  info(msg) {
    if (msg.includes('ready in')) {
      const local = msg.match(/Local:.+/);
      if (local) {
        console.clear();
        console.log('CSS Wizard Ready at http://localhost:' + (process.env.PORT || '5173'));
      }
      return;
    }
  },
  warn() {},
  warnOnce() {},
  error(msg) {
    console.error(msg);
  }
};

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: parseInt(process.env.PORT || '5173'),
    strictPort: true,
    watch: {
      usePolling: true
    },
    hmr: {
      overlay: false
    },
    clearScreen: true,
    logger: customLogger
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  publicDir: 'public', // Explicitly define public directory
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production',
    emptyOutDir: true,
    copyPublicDir: true, // Ensure public assets are copied to dist
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          lucide: ['lucide-react']
        }
      }
    }
  },
  logLevel: 'error',
  clearScreen: true
});