global.projectRoot = __dirname

const express = require('express')
const member = require(`${global.projectRoot}/routes/member`)
const product = require(`${global.projectRoot}/routes/product`)
const bodyParser = require('body-parser')
const server = express()

server.listen(3000)
server.use(bodyParser.json()) // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

server.use('/js', express.static(`${global.projectRoot}/static/dist/js`))

server.use('/member', member)

server.use('/product', product)

server.get('/', (req, res) => {
  res.sendFile(`${global.projectRoot}/static/dist/html/home/index.html`)
})

module.exports = server
