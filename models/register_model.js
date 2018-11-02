const db = require('./connection_db').member_info

module.exports = function register(memberData) {
  let result = {}
  return new Promise((resolve, reject) => {
    db.findOrCreate({
      where: { email: memberData.email },
      defaults: memberData
    }).then(rows => {
      if (rows[0].dataValues.id) {
        result.status = '註冊失敗。'
        result.err = '此email已被註冊過'
        reject(result)
      }else {
        result.registerMember = memberData
        resolve(result)
      }
    }).catch(err => {
      console.log(err);
      result.status = '註冊失敗。'
      result.err = '伺服器錯誤，請稍後在試！'
      reject(result)
    })
  })
}