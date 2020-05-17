const production = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  extends: [ 'plugin:vue/essential', '@vue/airbnb' ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'array-bracket-spacing': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'import/extensions': [
      'error',
      'always',
      {
        // vue: 'never',
        js: 'never',
      },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'no-console': production
      ? 'warn'
      : 'off',
    'no-debugger': production
      ? 'warn'
      : 'off',
    'no-multiple-empty-lines': [
      'error',
      { max: 2 },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      node: {
        paths: [
          'src',
        ],
        extensions: [
          '.vue',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
};
