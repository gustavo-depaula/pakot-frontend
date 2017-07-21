var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/Routes.js',
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, 'public/'),
    filename: '[name].bundle.js',
    publicPath: '/',
    sourceMapFilename: '[name].map'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192'
      }, {
         test: /\.(eot|svg|ttf|woff|woff2)$/,
         loader: 'file?name=public/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency'
            })
  ],
  resolve: {
    extensions: ['.js', '.json']
  }
};