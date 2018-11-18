const order = require('../connection_db').order

module.exports = (orderId, memberId, productId = null) => {
  return new Promise((resolve, reject) => {
    let condition = [
      { orderId: orderId },
      { memberId: memberId }
    ]
    if (productId) condition[2] = { productId: productId }
    order.findAll({
      where: {
        $and: condition
      }
    })
      .then(result => {
        if (result.length) resolve(result)
        else reject(new Error('找不到此訂單'))
      })
      .catch(() => reject(new Error('伺服器發生錯誤，請稍後再試')))
  })
}
