const crypto = require('crypto')

module.exports = function getRePassword (password) {
  // 加密
  const rePassword = crypto.createHash('sha1').update(password).digest('hex')
  return rePassword
}
