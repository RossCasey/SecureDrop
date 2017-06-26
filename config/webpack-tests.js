const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../test/client/index.js'),
  output: {
    path: path.resolve(__dirname, '../test/client'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.+.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2016', 'es2017', 'stage-0', 'react']
        }
      }
    ]
  }
}
