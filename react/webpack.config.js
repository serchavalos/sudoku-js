module.exports = {
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    publicPath: ''
  },

  module: {
    loaders: [
      { test: /\.js$/, include: __dirname, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] } }
    ]
  }
}
