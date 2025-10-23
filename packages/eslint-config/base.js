import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import stylistic from '@stylistic/eslint-plugin';
import pluginQuery from '@tanstack/eslint-plugin-query';


/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...pluginQuery.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1 }]
    }
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['warn', { 'prefer': 'no-type-imports' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
    }
  },
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/type-annotation-spacing': ['error', { before: false, after: true, overrides: { arrow: { before: true, after: true } } }],
      '@stylistic/space-before-function-paren': ['error', { anonymous: 'always', named: 'always', asyncArrow: 'always' }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/max-statements-per-line': ['error', { max: 2 }],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'never', prev: 'function-overload', 'next': 'function' }
      ],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/switch-colon-spacing': 'error',
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/semi': ['error', 'never']
    }
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "off",
    },
  },
  {
    ignores: ["dist/**"],
  },
];

export default config