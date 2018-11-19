const express = require('express')
const router = express.Router()

const Member = require('../controllers/member/get_controller')
const member = new Member()

router.get('/', member.getUserName)

module.exports = router
