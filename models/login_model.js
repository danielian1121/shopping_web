const db = require('./connection_db').member_info

module.exports = function memberLogin(memberData) {
  return new Promise((resolve, reject) => {
    db.findAll({
      where: {
        email: memberData.email,
        password: memberData.password
      }
    }).then(rows => {
      resolve(rows[0].dataValues)
    }).catch(() => {
      reject()
    })
  })
}