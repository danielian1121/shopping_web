global.projectRoot = __dirname

const express = require('express')
const api = require(`${global.projectRoot}/api/url`)
const routes = require(`${global.projectRoot}/routes/url`)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const serveStatic = require('serve-static')
const config = require(`${global.projectRoot}/config/development_config`)
const server = express()

server.listen(3000)
server.use(bodyParser.json()) // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

server.use(cookieParser(config.cookieSecret))

server.use('/js', express.static(`${global.projectRoot}/static/dist/js`))

server.use('/api', api)

// server.use(serveStatic('/', { 'index': `${global.projectRoot}/static/dist/html/home/index.html` }))

server.use('/', routes)

module.exports = server
