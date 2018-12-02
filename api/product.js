const express = require('express')
const router = express.Router()

const Product = require('../controllers/product/get_controller')
const product = new Product()

router.get(/^\/$/, product.getAllProduct)

router.get(/^\/[0-9]+$/, product.getOneProduct)

module.exports = router
