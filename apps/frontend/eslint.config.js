import myConfig from '../../node_modules/@repo/eslint-config/base.js'

export default [
  ...myConfig,
  {
    ignores: ['node_modules', '.turbo', 'dist', 'coverage', '.eslintrc.cjs', 'build', '.react-router']
  }
]