const product = require('../connection_db').product

module.exports = function getAllProduct () {
  return new Promise((resolve, reject) => {
    product.findAll()
      .then(rows => resolve(rows))
      .catch(() => reject(new Error('伺服器錯誤，請稍後在試！')))
  })
}
