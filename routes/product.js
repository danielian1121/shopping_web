const express = require('express')
const router = express.Router()

const Product = require('../controllers/product/get_controller')
const product = new Product()

router.get('/', product.getAllProduct)

module.exports = router
