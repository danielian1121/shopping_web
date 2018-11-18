const express = require('express')
const router = express.Router()

const ModifyOrder = require('../controllers/order/modify_controller')
const GetOrder = require('../controllers/order/get_controller')
const modifyOrder = new ModifyOrder()
const getOrder = new GetOrder()

router.post('/', modifyOrder.postOrderAllProduct)

router.put('/', modifyOrder.editOrder)

router.delete('/', modifyOrder.deleteOrder)

router.post('/one', modifyOrder.postOrderOneProduct)

router.put('/complete', modifyOrder.putProductComplete)

router.get('/', getOrder.getAllOrder)

router.get('/member', getOrder.getOneOrder)

module.exports = router
