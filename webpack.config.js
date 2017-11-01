const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dev = process.env.NODE_ENV === 'dev';

let config = {
  entry: './src/js/main.js',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|ttf|otf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            // options: {
            //   name: "[name].[ext]",
            //   outputPath: path.join(__dirname, "dist", "img"),
            // }
          }
        ]
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
  ],
  devServer: {
		host: '0.0.0.0',
		contentBase: path.join(__dirname, 'dist/'),
    port: '3001',
	},
}

module.exports = config;
