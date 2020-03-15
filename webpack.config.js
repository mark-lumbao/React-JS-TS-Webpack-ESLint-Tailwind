const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name][hash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpeg|jpg|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {

          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    overlay: true,
  },
};
