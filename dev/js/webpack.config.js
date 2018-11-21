const path = require('path')
const projectRoot = path.dirname(path.dirname(__dirname))
const devMode = true

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    'home/index': path.join(projectRoot, 'static/src/js/home/index.js'),
    'redirect/index': path.join(projectRoot, 'static/src/js/redirect/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(projectRoot, 'static/dist/js')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.pug$/,
        use:  [
          {
            loader:  'pug-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  }
}
