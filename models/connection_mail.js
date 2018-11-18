const config = require('../config/development_config')
const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailUser,
    pass: config.mailPassword
  }
})
