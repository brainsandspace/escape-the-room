module.exports = ({
  entry: ['babel-polyfill', './index.js'],

  output: {
    filename: 'client.bundle.js',
  },

  // module: {}


  devtool: 'cheap-module.eval-sourcemap',
})