import globals from "globals";
import { defineConfig } from "eslint/config";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginStorybook from 'eslint-plugin-storybook';
import vueParser from 'vue-eslint-parser';
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    ignores: [
      '**/dist/**', 
      '**/docs/**', 
      '**/node_modules/**'
    ]
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  ...pluginVue.configs['flat/recommended'],

  ...pluginStorybook.configs['flat/recommended'],

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.js'],
    plugins: {
      "@stylistic": stylistic,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      }
    },
    rules: {
      'indent': ['error', 2],

      'vue/multi-word-component-names': 'off',

      '@stylistic/semi': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variable', 'memberLike', 'function'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['variable'],
          modifiers: ['global', 'const'],
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: [
            'classProperty',
            'objectLiteralProperty',
            'typeProperty',
            'classMethod',
            'objectLiteralMethod',
            'typeMethod',
            'accessor',
            'enumMember',
          ],
          format: null,
          modifiers: ['requiresQuotes'],
        },
      ],
    },
  }
]);
