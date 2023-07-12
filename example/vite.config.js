import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// @see https://vitejs.dev/guide/dep-pre-bundling.html
export default defineConfig({
  plugins: [react()],
  // eslint-disable-next-line no-undef
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
