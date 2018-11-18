const order = require('../connection_db').order
const getProduct = require('../product/get_product')

const getOrderId = () => {
  return new Promise((resolve, reject) => {
    order.max('orderId')
      .then(maxId => {
        if (Number.isNaN(maxId)) resolve(0)
        else resolve(maxId)
      })
      .catch(() => reject(new Error('找尋orderId最大值發生錯誤')))
  })
}

module.exports = function orderAllProduct (orderList) {
  return new Promise(async (resolve, reject) => {
    let orderId = await getOrderId() + 1
    const products = orderList.productId
    const productArray = products.split(',')
    const quantitys = orderList.quantity
    const quantityArray = quantitys.split(',')

    let productQuantity = {}
    for (let i in productArray) {
      productQuantity[productArray[i]] = quantityArray[i]
    }
    let orderAllData = []
    for (let key in productQuantity) {
      const result = await getProduct(key)
      const orderData = {
        orderId: orderId,
        memberId: orderList.memberId,
        productId: key,
        orderQuantity: parseInt(productQuantity[key]),
        orderPrice: parseInt(result.price) * parseInt(productQuantity[key]),
        isComplete: 0,
        order_date: orderList.orderDate
      }
      await order.create(orderData)
        .then(() => orderAllData.push(orderData))
        .catch(() => reject(new Error('伺服器錯誤，請稍後再試')))
    }
    resolve(orderAllData)
  })
}
