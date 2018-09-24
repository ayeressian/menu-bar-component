/* global require, module, __dirname */

const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    port: 9997,
    historyApiFallback: {
      index: './example/index.html'
    }
  },
  entry: './src/menu_bar.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.(html)$/,
        use: 'html-loader'
      }
    ]
  }
};
