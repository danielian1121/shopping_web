const path = require('path')
const projectRoot = path.dirname(path.dirname(__dirname))
const devMode = true

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    'home/index': path.join(projectRoot, 'static/src/scss/home/index.scss')
  },
  output: {
    filename: '[name].js',
    path: path.join(projectRoot, 'static/dist/css')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: /scss\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+).scss/,
              name: '[1]/[2].css'
            }
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(projectRoot, 'static/src/scss')],
              sourceMap: true
            }
          }
        ]
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
