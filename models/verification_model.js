const jwt = require('jsonwebtoken')
const config = require('../config/development_config')

module.exports = function verifyToken(token) {
  const time = Math.floor(Date.now() / 1000)
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          let tokenResult = err
          reject(tokenResult)
        } else if (decoded.exp <= time) {
          let tokenResult = 'token expired'
          reject(tokenResult)
        } else {
          let tokenResult = decoded.data
          resolve(tokenResult)
        }
      })
    }
  })
}
