const db = require('./connection_db').member_info

module.exports = function memberEdit(id, memberUpdateDate) {
  return new Promise((resolve, reject) => {
    db.update(memberUpdateDate, {
      where: {
        id: id
      }
    }).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}