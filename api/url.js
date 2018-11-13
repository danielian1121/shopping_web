const express = require('express')
const router = express.Router()

const product = require(`${global.projectRoot}/api/product`)
const order = require(`${global.projectRoot}/api/order`)

router.use('/product', product)

router.use('/order', order)

module.exports = router
