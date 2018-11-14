const order = require('../connection_db').order

module.exports = (updateData, condition) => {
  return new Promise((resolve, reject) => {
    order.update(updateData, {
      where: condition
    })
      .then(result => resolve(result))
      .catch((e) => {
        console.log(e)
        reject(new Error('更新訂單失敗'))
      })
  })
}
