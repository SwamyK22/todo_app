module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@babel/eslint-parser',
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'react/state-in-constructor': 0,
    'no-restricted-globals': ['error', 'event'],
    'no-alert': 'off',
    'no-console': 'off',
    'react/prop-types': 0,
    "import/no-extraneous-dependencies": ["error", {"packageDir": path.join(__dirname, 'some-dir')}],
  },
};
