const verify = require('../../models/member/verification_model')
const getAll = require('../../models/order/all_order_model')
const getOne = require('../../models/order/one_order_model')

module.exports = class Order {
  getAllOrder (req, res, next) {
    const token = req.headers['token']
    if (!token) {
      res.json({
        status: '查詢訂單時發生錯誤',
        err: '請重新登入。'
      })
    } else {
      verify(token)
        .catch(e => {
          res.json({
            status: '查詢訂單時發生錯誤',
            err: e.message
          })
        })
        .then(result => {
          return getAll()
        })
        .then(result => {
          res.json({
            result
          })
        })
        .catch(e => {
          res.json({
            status: '查詢訂單時發生錯誤',
            err: e.message
          })
        })
    }
  }

  getOneOrder (req, res, next) {
    const token = req.headers['token']
    if (!token) {
      res.json({
        status: '查詢訂單時發生錯誤',
        err: '請重新登入。'
      })
    } else {
      verify(token)
        .catch(e => {
          res.json({
            status: '查詢訂單時發生錯誤',
            err: e.message
          })
        })
        .then(result => getOne(result))
        .then(result => {
          res.json({
            result
          })
        })
        .catch(e => {
          res.json({
            status: '查詢訂單時發生錯誤',
            err: e.message
          })
        })
    }
  }
}
