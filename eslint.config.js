import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import ts from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default [
    js.configs.recommended,
    ...ts.configs.recommendedTypeChecked,
    ...pluginVue.configs['flat/strongly-recommended'],

    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021
            },
            parser: vueParser,
            parserOptions: {
                parser: ts.parser,
                project: ['./tsconfig.app.json', './tsconfig.node.json'],
                tsconfigRootDir: import.meta.dirname,
                sourceType: 'module',
                ecmaVersion: 'latest',
                extraFileExtensions: ['.vue']
            }
        },

        plugins: {
            import: pluginImport,
            vue: pluginVue,
            '@typescript-eslint': ts.plugin
        },

        settings: {
            'import/resolver': {
                typescript: {
                    project: ['./tsconfig.app.json', './tsconfig.node.json']
                },
                node: true
            }
        },

        rules: {
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            indent: 'off',
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            eqeqeq: ['error', 'always'],

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',

            'vue/html-indent': ['error', 2],
            'vue/multi-word-component-names': 'error',
            'vue/max-attributes-per-line': 'off',
            'vue/component-name-in-template-casing': ['error', 'PascalCase'],
            'vue/define-props-declaration': ['error', 'type-based'],
            'vue/define-emits-declaration': ['error', 'type-literal'],
            'vue/no-v-html': 'warn',
            'vue/require-toggle-inside-transition': 'error',
            'vue/no-mutating-props': 'error',
            'vue/attribute-hyphenation': ['error', 'always'],
            'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],

            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type'
                    ],
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after'
                        }
                    ],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true }
                }
            ],
            'import/no-unresolved': 'error'
        }
    },

    eslintConfigPrettier,

    {
        files: ['**/*.d.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off'
        }
    },

    {
        files: ['**/*.config.{js,ts}'],
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    },

    {
        ignores: [
            'dist/',
            'node_modules/',
            '.tmp/',
            'coverage/',
            '.vscode/',
            '.idea/',
            '**/*.script.js',
            '.nuxt/',
            '.output/',
            'public/',
            'static/'
        ]
    }
];