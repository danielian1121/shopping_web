const db = require('../connection_db').memberInfo

module.exports = function memberEdit (id, memberUpdateDate) {
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
