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
      .then(result => resolve(result))
      .catch(() => reject(new Error('此訂單不存在')))
  })
}
