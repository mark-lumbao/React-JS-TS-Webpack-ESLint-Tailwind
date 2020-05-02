const { join, resolve: pathResolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const entry = join(__dirname, '/src/index.tsx');

const output = {
  path: join(__dirname, 'dist'),
  filename: '[name].bundle.js',
  chunkFilename: '[name][hash].bundle.js',
};

const resolve = {
  extensions: ['.js', '.ts', '.tsx', '.jsx'],
  modules: [
    'node_modules',
    pathResolve(__dirname, 'src'),
  ],
};

const loaderModules = {
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
      test: /\.js$/,
      use: ['babel-loader'],
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
};

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './src/public/index.html',
    minify: true,
    favicon: 'src/assets/images/logo.png',
  }),
];

const devServer = {
  overlay: true,
};

module.exports = {
  entry,
  output,
  resolve,
  module: loaderModules,
  plugins,
  devServer,
};
