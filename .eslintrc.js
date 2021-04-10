module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error']
  }
}
