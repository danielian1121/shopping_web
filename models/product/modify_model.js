const product = require('../connection_db').product

module.exports = (productId, updateData) => {
  return new Promise((resolve, reject) => {
    product.update(updateData, {
      where: {
        id: productId
      }
    })
      .then(result => resolve(result))
      .catch((e) => {
        console.log(e)
        reject(new Error('更新商品失敗'))
      })
  })
}
