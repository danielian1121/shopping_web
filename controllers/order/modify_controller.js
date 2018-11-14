const verify = require('../../models/member/verification_model')
const orderProductListData = require('../../models/order/order_all_porduct_model')
const checkOrderExist = require('../../models/order/check_exist_model')
const checkOrderIdExist = require('../../models/order/check_exit_orderId_model')
const getProductPrice = require('../../models/product/get_product_price')
const updateOrder = require('../../models/order/update_model')
const deleteOrder = require('../../models/order/delete_model')
const addOneOrder = require('../../models/order/order_one_product_model')

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

  postOrderOneProduct (req, res, next) {
    const token = req.headers['token']
    if (!token) {
      res.json({
        status: '新增訂單時發生錯誤',
        err: '請重新登入。'
      })
    } else {
      let condition = {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
      let updateData = {}
      verify(token)
        .then(memberId => {
          condition.memberId = memberId
          return checkOrderIdExist(condition.orderId)
        })
        .then(result => {
          if (result[0].dataValues.isComplete === 1) {
            res.json({
              status: '新增訂單時發生錯誤',
              err: '此訂單已完成'
            })
          } else {
            return getProductPrice(result[0].dataValues.productId)
          }
        })
        .then(price => {
          updateData.orderQuantity = req.body.quantity
          updateData.orderPrice = price * req.body.quantity
          const orderData = {
            orderId: condition.orderId,
            memberId: condition.memberId,
            productId: condition.productId,
            orderQuantity: req.body.quantity,
            orderPrice: parseInt(price) * parseInt(req.body.quantity),
            isComplete: 0,
            order_date: onTime()
          }
          return addOneOrder(orderData)
        })
        .then(result => {
          res.json({
            result
          })
        })
        .catch(e => {
          res.json({
            status: '新增訂單時發生錯誤',
            err: e.message
          })
        })
    }
  }

  editOrder (req, res, next) {
    const token = req.headers['token']
    if (!token) {
      res.json({
        status: '更新訂單時發生錯誤',
        err: '請重新登入。'
      })
    } else {
      let condition = {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
      let updateData = {}
      verify(token)
        .then(memberId => {
          condition.memberId = memberId
          return checkOrderExist(condition.orderId, condition.memberId, condition.productId)
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
          updateData.orderQuantity = req.body.quantity
          updateData.orderPrice = price * req.body.quantity
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

  deleteOrder (req, res, next) {
    const token = req.headers['token']
    const productIds = req.body.productId.replace(' ', '')
    const productIdArray = productIds.split(',')
    let condition = {
      orderId: req.body.orderId
    }
    if (!token) {
      res.json({
        status: '刪除訂單時發生錯誤',
        err: '請重新登入。'
      })
    } else {
      verify(token)
        .then(memberId => {
          condition.memberId = memberId
          for (let value of productIdArray) {
            checkOrderExist(condition.orderId, memberId, value)
              .then(result => {
                if (result[0].dataValues.isComplete === 1) {
                  res.json({
                    status: '刪除訂單時發生錯誤',
                    err: '此訂單已完成'
                  })
                } else {
                  condition.productId = value
                  return deleteOrder(condition)
                }
              })
              .then(result => {
              })
              .catch(e => {
              })
          }
          res.json({
            status: '刪除訂單成功'
          })
        })
        .catch(e => {
          res.json({
            status: '刪除訂單時發生錯誤',
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
