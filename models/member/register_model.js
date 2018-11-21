const member = require('../connection_db').member

module.exports = function register (memberData) {
  return new Promise((resolve, reject) => {
    member.findOrCreate({
      where: { email: memberData.email },
      defaults: memberData
    }).then(rows => {
      if (rows[0].dataValues.id) {
        reject(new Error('此email已被註冊過'))
      } else {
        let text = `http://localhost:3000/api/member/register?id=${rows[0].null}&code=${rows[0].dataValues.code}`
        let result = {
          email: rows[0].dataValues.email,
          text: text
        }
        resolve(result)
      }
    }).catch(() => {
      reject(new Error('伺服器錯誤，請稍後在試！'))
    })
  })
}
