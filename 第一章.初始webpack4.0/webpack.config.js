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
      }
    ]
  }
}