const express = require('express')
const router = express.Router()

const product = require(`${global.projectRoot}/api/product`)

router.use('/product', product)

module.exports = router
