const order = require('../connection_db').order

module.exports = (orderId, memberId, productId) => {
  return new Promise((resolve, reject) => {
    order.findAll({
      where: {
        $and: [
          { orderId: orderId },
          { memberId: memberId },
          { productId: productId }
        ]
      }
    })
      .then(result => {
        if (result.length) resolve(result)
        else reject(new Error('找不到此訂單'))
      })
      .catch(() => reject(new Error('伺服器發生錯誤，請稍後再試')))
  })
}
