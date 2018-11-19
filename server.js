global.projectRoot = __dirname

const express = require('express')
const member = require(`${global.projectRoot}/routes/member`)
const api = require(`${global.projectRoot}/api/url`)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require(`${global.projectRoot}/config/development_config`)
const server = express()

server.listen(3000)
server.use(bodyParser.json()) // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

server.use(cookieParser(config.cookieSecret))

server.use('/js', express.static(`${global.projectRoot}/static/dist/js`))

server.use('/member', member)

server.use('/api', api)

server.get('/', (req, res) => {
  res.sendFile(`${global.projectRoot}/static/dist/html/home/index.html`)
})

module.exports = server
