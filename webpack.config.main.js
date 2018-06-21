const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const base = require('./webpack.config');

const config = {
  /**
   * Set target to Electron specific node.js env.
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: 'electron-main',

  entry: {
    index: './src/main/index.js'
  },

  output: {
    path: path.join(__dirname),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  node: {
    /**
     * Disables webpack processing of __dirname and __filename.
     * If you run the bundle in node.js it falls back to these values of node.js.
     * https://github.com/webpack/webpack/issues/2010
     */
    __dirname: false,
    __filename: false
  },

  externals: [nodeExternals()]
};

module.exports = merge.smart(base.config, config);
