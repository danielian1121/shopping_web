const express = require('express')
const router = express.Router()

const Order = require('../controllers/order/modify_controller')
const order = new Order()

router.post('/', order.postOrderAllProduct)

router.get('/', order.getAllOrder)

module.exports = router
