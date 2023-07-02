import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// @see https://vitejs.dev/guide/dep-pre-bundling.html
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  optimizeDeps: {
    include: ['react-github-calendar'],
  },
  build: {
    outDir: 'build',
    commonjsOptions: {
      include: [/react-github-calendar/],
    },
  },
});
