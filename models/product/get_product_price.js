const product = require('../connection_db').product

module.exports = (productId) => {
  return new Promise((resolve, reject) => {
    product.findByPk(productId)
      .then(result => resolve(result.dataValues.price))
      .catch(() => reject(new Error('獲取商品價格時發生錯誤')))
  })
}
