module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'module-resolver',
      {
        root: [ './src' ],
        alias: {
          '/': './',
        },
        stripExtensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.vue',
        ],
      },
    ],
  ],
};
