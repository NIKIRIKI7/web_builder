import js from '@eslint/js';
import ts from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default ts.config(
    // 1. Базовые конфигурации. Они уже содержат необходимые плагины.
    js.configs.recommended,
    ...ts.configs.recommended,
    ...pluginVue.configs['flat/recommended'],

    // 2. Наш основной кастомный объект для правил и настроек.
    //    ЗДЕСЬ НЕ НУЖНО СНОВА ОБЪЯВЛЯТЬ `plugins`.
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
            parser: vueParser,
            parserOptions: {
                parser: ts.parser,
                sourceType: 'module',
                ecmaVersion: 'latest',
                extraFileExtensions: ['.vue'],
            },
        },

        settings: {
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },

        rules: {
            // Общие правила
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'indent': ['error', 2, { SwitchCase: 1 }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'no-unused-vars': 'off',

            // Правила TypeScript (плагин уже зарегистрирован выше)
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
            '@typescript-eslint/no-explicit-any': 'warn',

            // Правила Vue (плагин уже зарегистрирован выше)
            'vue/html-indent': ['error', 2],
            'vue/multi-word-component-names': 'off',
            'vue/max-attributes-per-line': ['warn', { singleline: { max: 3 }, multiline: { max: 1 } }],
            'vue/component-name-in-template-casing': ['error', 'PascalCase'],
            'vue/define-props-declaration': ['error', 'type-based'],
            'vue/define-emits-declaration': ['error', 'type-literal'],
            'vue/no-v-html': 'off',
            'vue/require-toggle-inside-transition': 'off',
        },
    },

    // 3. Конфигурация Prettier должна идти ПОСЛЕДНЕЙ, чтобы отключать
    //    правила форматирования из всех предыдущих конфигов.
    eslintConfigPrettier,

    // 4. Игнорируемые файлы
    {
        ignores: [
            'dist/',
            'node_modules/',
            '.tmp/',
            '**/*.d.ts',
        ],
    }
);