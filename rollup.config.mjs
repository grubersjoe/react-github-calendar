import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import filesize from 'rollup-plugin-filesize'

const extensions = ['.ts', '.tsx']

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'build',
    format: 'es',
    chunkFileNames: 'chunks/[name]-[hash].js',
    sourcemap: true,
    exports: 'named',
    // Use 'auto' instead of 'default' to support more environments.
    // https://rollupjs.org/guide/en/#outputinterop
    interop: 'auto',
    // Rollup does not support this React Server Components directive yet:
    // https://github.com/rollup/rollup/issues/4699
    banner: `'use client';`,
  },
  external: ['react', 'react/jsx-runtime', 'react-activity-calendar'],
  plugins: [
    babel({
      extensions,
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    resolve({
      extensions,
    }),
    copy({
      targets: [{ src: 'src/styles/tooltips.css', dest: 'build/' }],
    }),
    filesize(),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) {
      return // ignore the error for now
    }
    warn(warning)
  },
}
