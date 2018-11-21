const member = require('../connection_db').member

module.exports = function register (condition, data) {
  return new Promise((resolve, reject) => {
    member.update(data, {
      where: condition
    }).then(result => resolve(result))
      .catch(() => reject(new Error('伺服器錯誤，請稍後再試')))
  })
}
