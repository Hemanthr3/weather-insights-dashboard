import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split Recharts into its own chunk
          if (id.includes('node_modules/recharts')) {
            return 'recharts';
          }

          // Split React ecosystem into its own chunk
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/scheduler')
          ) {
            return 'react-vendor';
          }

          // Split date utilities
          if (id.includes('node_modules/date-fns')) {
            return 'date-fns';
          }

          // Split tanstack query
          if (id.includes('node_modules/@tanstack')) {
            return 'tanstack';
          }

          // Split other large UI libraries
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }

          // Keep other node_modules in a shared vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Target modern browsers for better optimization
    target: 'es2015',
    // Optimize chunk size
    chunkSizeWarningLimit: 600, // Adjust warning limit (Recharts is legitimately large)
  },
});
