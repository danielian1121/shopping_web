const order = require('../connection_db').order

module.exports = (insertData) => {
  return new Promise((resolve, reject) => {
    order.create(insertData)
      .then(result => resolve(result))
      .catch(() => reject(new Error('伺服器錯誤，請稍後再試')))
  })
}
