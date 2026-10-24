// Karma ejecuta las pruebas escritas con Jasmine en Google Chrome.
// Webpack y Babel permiten importar módulos JS/JSX del proyecto Vite.
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [
      { pattern: 'tests/**/*.spec.js', watched: false },
    ],
    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
              },
            },
          },
        ],
      },
      stats: 'errors-only',
    },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
    ],
    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,
    port: 9876,
  });
};
