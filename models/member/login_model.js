const member = require('../connection_db').memberInfo

module.exports = function memberLogin (memberData) {
  return new Promise((resolve, reject) => {
    member.findAll({
      where: {
        email: memberData.email,
        password: memberData.password
      }
    }).then(rows => {
      resolve(rows[0].dataValues)
    }).catch(() => {
      reject(new Error('帳號或密碼錯誤'))
    })
  })
}
