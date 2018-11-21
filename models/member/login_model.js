const member = require('../connection_db').member

module.exports = function memberLogin (memberData) {
  return new Promise((resolve, reject) => {
    member.findAll({
      where: {
        email: memberData.email,
        password: memberData.password
      }
    }).then(rows => {
      if (!rows.length) reject(new Error('帳號密碼錯誤'))
      else if (!rows[0].dataValues.verification) reject(new Error('此帳號尚未驗證，請先驗證'))
      resolve(rows[0].dataValues)
    }).catch(() => {
      reject(new Error('系統發生錯誤，請稍後再試'))
    })
  })
}
