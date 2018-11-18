const member = require('../connection_db').member

module.exports = (productId) => {
  return new Promise((resolve, reject) => {
    member.findByPk(productId)
      .then(result => resolve(result.dataValues))
      .catch(() => reject(new Error('獲取會員資訊時發生錯誤')))
  })
}
