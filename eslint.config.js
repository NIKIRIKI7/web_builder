import js from '@eslint/js';
import ts from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default ts.config(
    js.configs.recommended,
    ...ts.configs.recommended,
    ...pluginVue.configs['flat/recommended'],

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
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'indent': ['error', 2, { SwitchCase: 1 }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'no-unused-vars': 'error',

            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
            '@typescript-eslint/no-explicit-any': 'warn',

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

    eslintConfigPrettier,

    {
        ignores: [
            'dist/',
            'node_modules/',
            '.tmp/',
            '**/*.d.ts',
        ],
    }
);