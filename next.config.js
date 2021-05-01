const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
module.exports = withPlugins([
  [optimizedImages, {
    mozjpeg: {
      quality: 80,
    },
    pngquant: {
      speed: 3,
      strip: true,
      verbose: true,
    },
    imagesPublicPath: '/covid19-resources/_next/static/images/',
  }],
  {
    basePath: '/covid19-resources',
    assetPrefix: '/covid19-resources/',
    env,
  },
]);