const path = require('path');

module.exports = {
  entry: [
    './app/scripts/background/index.jsx'
  ],

  output: {
    filename: 'background.js',
    path: path.join(__dirname, '../../', 'build')
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  }
};
