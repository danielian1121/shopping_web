const verify = require('../../models/member/verification_model')
const orderProductListData = require('../../models/order/orderAllPorduct')
const getAll = require('../../models/order/allOrder_model')

module.exports = class Order {
  postOrderAllProduct (req, res, next) {
    const token = req.headers['token']
    if (!token) {
      res.json({
        status: '訂單輸入時發生錯誤',
        err: '請重新登入。'
      })
    } else {
      verify(token)
        .catch(e => {
          res.json({
            status: '訂單輸入時發生錯誤',
            err: e.message
          })
        })
        .then(result => {
          const orderList = {
            memberId: result,
            productId: req.body.productId,
            quantity: req.body.quantity,
            orderDate: onTime()
          }
          return orderProductListData(orderList)
        })
        .then(result => {
          res.json({
            result
          })
        })
        .catch(e => {
          res.json({
            status: '訂單輸入時發生錯誤',
            err: e.message
          })
        })
    }
  }

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
            status: '訂單輸入時發生錯誤',
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
}

const onTime = () => {
  const date = new Date()
  const mm = date.getMonth() + 1
  const dd = date.getDate()
  const hh = date.getHours()
  const mi = date.getMinutes()
  const ss = date.getSeconds()

  return [date.getFullYear(), '-' +
      (mm > 9 ? '' : '0') + mm, '-' +
      (dd > 9 ? '' : '0') + dd, ' ' +
      (hh > 9 ? '' : '0') + hh, ':' +
      (mi > 9 ? '' : '0') + mi, ':' +
      (ss > 9 ? '' : '0') + ss
  ].join('')
}
