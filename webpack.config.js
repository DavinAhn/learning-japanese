const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  devtool: 'source-map',

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]
};

if (isDev) {
  config.watchOptions = {
    aggregateTimeout: 300,
    poll: 1000
  };
} else {
  config.plugins = [
    ...(config.plugins || []),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        warnings: false,
        mangle: {
          eval: true,
          properties: {
            builtins: true,
            regex: /secretKey|fromBytes|toBytes|ModeOfOperation|cbc|padding|ecb|pkcs7|encrypt|decrypt/i
          }
        },
        compress: true,
        output: {
          comments: false,
          beautify: false
        }
      }
    })
  ];
}

module.exports = { config, isDev };
