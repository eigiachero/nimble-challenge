import myConfig from '@repo/eslint-config/base.js'

export default [
  ...myConfig,
  {
    ignores: ['node_modules', '.turbo', 'dist', 'coverage', '.eslintrc.cjs']
  }
]