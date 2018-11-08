const path = require('path')
const projectRoot = path.dirname(path.dirname(__dirname))
const { staticUrl } = require(path.join(projectRoot, 'setting/server/config'))
const devMode = true

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    'home/index': path.join(projectRoot, 'static/src/pug/home/index.pug')
  },
  output: {
    filename: '[name].js',
    path: path.join(projectRoot, 'static/dist/html')
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: /pug\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+).pug/,
              name: '[1]/[2].html'
            }
          },
          'extract-loader',
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              basedir: path.join(projectRoot, 'static/src/pug'),
              data: {
                staticUrl
              }
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
