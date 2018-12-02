const express = require('express')
const router = express.Router()
const home = require(`${global.projectRoot}/routes/home`)
const product = require(`${global.projectRoot}/routes/product`)

router.use('/', home)

router.use('/product', product)

module.exports = router
