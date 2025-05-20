import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintJs from '@eslint/js';

export default [
  // Ignores - migrated from .eslintignore
  {
    ignores: [
      // Build outputs
      'dist/**',
      'build/**',
      'coverage/**',
      
      // Dependencies
      'node_modules/**',
      
      // Misc
      '.DS_Store',
      '*.log',
      
      // Explicitly ignore .eslintignore to prevent warning
      '.eslintignore',
    ]
  },
  
  // Base configuration for all files
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
      },
      globals: {
        // Define common globals
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      'no-console': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]; 