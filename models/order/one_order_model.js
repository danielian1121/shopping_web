const order = require('../connection_db').order

module.exports = function getOneOrderData (memberId) {
  return new Promise((resolve, reject) => {
    order.findAll({
      where: {
        memberId: memberId
      }
    })
      .then(rows => resolve(rows))
      .catch(() => reject(new Error('獲取會員訂單時發生錯誤')))
  })
}
