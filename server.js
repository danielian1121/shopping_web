global.projectRoot = __dirname

const express = require('express')
const member = require( `${ global.projectRoot }/routes/member` )
const bodyParser = require('body-parser')
const server = express()

server.listen(3000)
server.use(bodyParser.json());       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded( {     // to support URL-encoded bodies
  extended: true
} ))

server.use('/member', member)