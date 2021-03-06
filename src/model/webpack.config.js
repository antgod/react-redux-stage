const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const publicPath = path.resolve(__dirname, 'public')

module.exports = {
  entry: {
    index: [
      path.resolve(__dirname, 'index.js'),
    ],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: publicPath,
    filename: '[name].js?[hash]',
  },
  resolve: {
    extension: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
      {
        test: /\.md$/,
        loaders: ['html', 'markdown'],
      },
      {
        test: /\.css/,
        // ?module开启css modules
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test: /\.less/,
        // ?module开启css modules
        loader: ExtractTextPlugin.extract('style', 'css!less'),
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192',
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000',
      },
    ],
  },
  plugins: [
    // 出现异常不退出进程
    new webpack.NoErrorsPlugin(),
    // 第三方库包提取
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js?[hash]'),
    // 自动创建html
    new HtmlWebpackPlugin({
      title: 'react',
      template: path.resolve(__dirname, './index.html'),
    }),
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
    }),
    // 源码忽略
    new webpack.SourceMapDevToolPlugin({
      exclude: /node_modules/,
    }),
    // 单独提取css文件
    new ExtractTextPlugin('index.css', {
      disable: false,
      allChunks: true,
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
  ],
  devServer: {
    stats: 'errors-only',
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
}
