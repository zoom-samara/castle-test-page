const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants'); // Get values from `next-server` package when building on now v2

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    // Config used to run in production.
    return {};
  }

  const withTypescript = require('@zeit/next-typescript');
  const withSass = require('@zeit/next-sass');

  const nextConfig = {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 3,
      localIdentName: '[name]-[local]___[hash:base64:5]',
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg/,
        use: ['@svgr/webpack'],
      });
      config.module.rules.push({
        test: /\.(sass|scss)/,
        use: [{
          loader: 'sass-resources-loader',
          options: {
            // Provide path to the file with resources
            resources: ['./styles/_variables.scss', './styles/_breakpoints.scss', './styles/_presets.scss'],
          },
        }],
      });

      return config;
    },
  };

  return withTypescript(withSass(nextConfig));
};
