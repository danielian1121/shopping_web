const order = require('../connection_db').order

module.exports = function getAllOrderData () {
  return new Promise((resolve, reject) => {
    order.findAll()
      .then(rows => resolve(rows))
      .catch(() => reject(new Error('獲取全部訂單資料時發生錯誤')))
  })
}
