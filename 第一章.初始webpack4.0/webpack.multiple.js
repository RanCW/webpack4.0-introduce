module.exports = {
  entry:{
    app: './src/index.js',
    list: './src/list.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}