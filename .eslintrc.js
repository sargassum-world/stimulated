module.exports = {
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true
  },
  rules: {
    'linebreak-style': 'off',
  },
  ignorePatterns: ['node_modules']
};
