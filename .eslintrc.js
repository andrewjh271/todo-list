module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': ['error', { functions: false }],
    'comma-dangle': ['error', {
      arrays: 'ignore',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'no-plusplus': 0,
    'no-alert': 0,
  },
};
