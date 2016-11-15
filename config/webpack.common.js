var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [{
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader', 'angular2-template-loader']
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'file?name=assets/[name].[hash].[ext]'
    }, {
      test: /\.(css|less)$/,
      exclude: helpers.root('src', 'app'),
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!less')
    }, {
      //第二个模式过滤器是给组件局部样式的，并通过 raw 加载器把它们加载成字符串——那是 Angular 期望通过元数据的 styleUrls 属性来指定样式的形式。
      test: /\.(css|less)$/,
      include: helpers.root('src', 'app'),
      loaders: ['raw', 'postcss', 'less']
    }]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ],

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
