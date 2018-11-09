const jwt = require('jsonwebtoken')
const config = require('../../config/development_config')

module.exports = function verifyToken (token) {
  const time = Math.floor(Date.now() / 1000)
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          reject(new Error('請重新登入'))
        } else if (decoded.exp <= time) {
          reject(new Error('請重新登入'))
        } else {
          resolve(decoded.data)
        }
      })
    }
  })
}
