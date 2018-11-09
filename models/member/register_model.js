const member = require('../connection_db').memberInfo

module.exports = function register (memberData) {
  return new Promise((resolve, reject) => {
    member.findOrCreate({
      where: { email: memberData.email },
      defaults: memberData
    }).then(rows => {
      if (rows[0].dataValues.id) {
        reject(new Error('此email已被註冊過'))
      } else {
        resolve(memberData)
      }
    }).catch(() => {
      reject(new Error('伺服器錯誤，請稍後在試！'))
    })
  })
}
