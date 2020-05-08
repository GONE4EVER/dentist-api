module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: [ './src' ],
        alias: {
          '/': './',
          '@/': './',
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
