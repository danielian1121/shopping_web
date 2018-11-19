const express = require('express')
const router = express.Router()

const product = require(`${global.projectRoot}/api/product`)
const order = require(`${global.projectRoot}/api/order`)
const member = require(`${global.projectRoot}/api/member`)

router.use('/product', product)

router.use('/order', order)

router.use('/member', member)

module.exports = router
