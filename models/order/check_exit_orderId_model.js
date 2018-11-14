const order = require('../connection_db').order

module.exports = (orderId) => {
  return new Promise((resolve, reject) => {
    order.findAll({
      where: {
        orderId: orderId
      }
    })
      .then(result => {
        if (result.length) resolve(result)
        else reject(new Error('找不到此訂單'))
      })
      .catch(() => reject(new Error('伺服器發生錯誤，請稍後再試')))
  })
}
