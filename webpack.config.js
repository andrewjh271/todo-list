const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
  },
  devServer: {
    watchContentBase: true,
  },
  mode: 'development',
  devtool: 'source-map'
};