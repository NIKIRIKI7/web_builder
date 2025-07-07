import js from '@eslint/js';
import ts from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default [
  // Базовые конфигурации
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],

  // Отключает правила, конфликтующие с Prettier
  eslintConfigPrettier,

  // Основная конфигурация для всех файлов
  {
    languageOptions: {
      // Глобальные переменные для окружения
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      // Парсер для Vue файлов
      parser: vueParser,
      parserOptions: {
        // Парсер для секции <script> в Vue файлах
        parser: ts.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
      },
    },

    // Настройки для плагинов
    settings: {
      // Указываем eslint-plugin-import, как разрешать пути TypeScript
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },

    // Кастомные правила
    rules: {
      // --- Общие правила ---
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-unused-vars': 'off', // Отключено в пользу правила от typescript-eslint

      // --- Правила TypeScript ---
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // --- Правила Vue ---
      'vue/html-indent': ['error', 2],
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': ['warn', {
        'singleline': { 'max': 3 },
        'multiline': { 'max': 1 }
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/define-emits-declaration': ['error', 'type-literal'],
      'vue/no-v-html': 'off',
    },
  },
];