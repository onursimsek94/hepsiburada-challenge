const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /__test__/]
      },
      { test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/public/'
        }),
        exclude: '/node_modules/'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader'
        }]
      },
      {
        test: /\.(png|jpg|jpeg|ico|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      Actions: path.resolve(__dirname, 'src/actions'),
      Reducers: path.resolve(__dirname, 'src/reducers'),
      Containers: path.resolve(__dirname, 'src/containers'),
      Components: path.resolve(__dirname, 'src/components'),
      Resource: path.resolve(__dirname, 'src/resource')
    },
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new ExtractTextPlugin({filename: 'bundle.css'}),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    compress: true,
    port: 3000,
    filename: 'bundle.js',
    historyApiFallback: true,
    overlay: true,
    publicPath: '/public/'
  },
  devtool: 'cheap-module-eval-source-map' // nosources-source-map
}
