const postcssPresetEnv = require('postcss-preset-env');


const config = () => ({
  plugins: [
    postcssPresetEnv({
      features: {
        'custom-media-queries': true,
      },
      importFrom: [
        {
          customMedia: {
            '--desktop-viewport': '(min-width: 1025px)',
            '--tablet-viewport': '(min-width: 769px) and (max-width: 1024px)',
            '--mobile-viewport': '(max-width: 768px)',
          },
        },
      ],
    }),
  ],
});


module.exports = config;
