const crypto = require('crypto')

module.exports = function getRePassword (password) {
  return new Promise((resolve, reject) => {
    if (!password) reject(new Error('密碼不能為空'))
    const rePassword = crypto.createHash('sha1').update(password).digest('hex')
    resolve(rePassword)
  })
}
