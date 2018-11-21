const config = require('../config/development_config')
const xoauth2 = require('xoauth2')
const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    user: config.mailUser,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: config.refreshToken
  }
})
