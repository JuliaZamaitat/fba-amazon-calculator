module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    $nuxt: true
  },
  // parserOptions: {
  //   parser: 'babel-eslint'
  // },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/prettier'
  ]
};
