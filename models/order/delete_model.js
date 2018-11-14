const order = require('../connection_db').order

module.exports = (condition) => {
  return new Promise((resolve, reject) => {
    order.destroy({
      where: condition
    })
      .then(result => resolve(result))
      .catch((e) => {
        console.log(e)
        reject(new Error('刪除紀錄失敗'))
      })
  })
}
