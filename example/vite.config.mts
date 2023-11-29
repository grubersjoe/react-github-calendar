import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/react-github-calendar/' : undefined,
  server: {
    port: 8080,
    host: true,
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
