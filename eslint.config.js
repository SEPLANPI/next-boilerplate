import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default tseslint.config(...compat.extends('standard', 'next/core-web-vitals'), {
  ignores: ['dist'],
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    globals: {
      window: 'readonly',
      document: 'readonly',
      console: 'readonly',

      process: 'readonly',
      __dirname: 'readonly',
      module: 'readonly'
    }
  },
  plugins: {
    prettier,
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh
  },
  rules: {
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'none',
        arrowParens: 'always',
        semi: false,
        endOfLine: 'auto'
      }
    ]
  }
})
