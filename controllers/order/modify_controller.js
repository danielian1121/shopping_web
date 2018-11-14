const verify = require('../../models/member/verification_model')
const orderProductListData = require('../../models/order/order_all_porduct_model')
const checkOrderExist = require('../../models/order/check_order_exist_model')
const getProductPrice = require('../../models/product/get_product_price')
const updateOrder = require('../../models/order/update_order_model')

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

  editOrder (req, res, next) {
    checkOrderExist(req.body.orderId, req.body.memberId, req.body.productId)
      .catch(e => {
        res.json({
          status: '更新訂單時發生錯誤',
          err: e.message
        })
      })
      .then(result => {
        if (result[0].dataValues.isComplete === 1) {
          res.json({
            status: '更新訂單時發生錯誤',
            err: '此訂單已完成'
          })
        } else {
          return getProductPrice(result[0].dataValues.productId)
        }
      })
      .then(price => {
        const condition = {
          orderId: req.body.orderId,
          productId: req.body.productId,
          memberId: req.body.memberId
        }
        const updateData = {
          orderQuantity: req.body.quantity,
          orderPrice: price * req.body.quantity
        }
        return updateOrder(updateData, condition)
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
