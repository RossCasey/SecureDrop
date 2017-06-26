const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/client/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'bundle.js'
  },
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
