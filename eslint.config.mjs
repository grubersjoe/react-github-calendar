import eslint from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import typescript from 'typescript-eslint'

export default defineConfig(
  eslint.configs.recommended,
  typescript.configs.strictTypeChecked,
  typescript.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    rules: {
      'no-console': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'react/no-unescaped-entities': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    // Note: there must be no other properties in this object
    ignores: ['build/', 'public/', 'example/build/', 'rollup.config.mjs'],
  },
)
