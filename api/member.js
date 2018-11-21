const express = require('express')
const router = express.Router()

const Member = require('../controllers/member/api_controller')
const member = new Member()

router.get('/', member.getUserName)

router.get('/register', member.checkRegister)

module.exports = router
