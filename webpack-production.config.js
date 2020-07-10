const config = require('./webpack.config')
const WebpackStrip = require('strip-loader')

const stripLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: WebpackStrip.loader('console.log')
}

config.module.rules.push(stripLoader)
config.mode = 'production'

module.exports = config
