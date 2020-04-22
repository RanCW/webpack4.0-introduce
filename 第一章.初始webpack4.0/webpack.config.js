const HtmlWebpackPlugins = require('html-webpack-plugin');
module.exports = {
  entry : './src/index.js',
  output:{
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        use:[
          {
            loader:'babel-loader'
          }
        ]
      },
      {
        test:/\.css/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use:[
          {
            loader:'style-loader',
          },
          {
            loader:'css-loader',
          },
          {
            loader:'less-loader',
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use:[
          {
            loader:'file-loader',
          },
        ]
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugins({
      template: 'index.html',
      filename: 'index.html'
    })
  ]
}