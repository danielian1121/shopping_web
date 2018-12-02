const express = require('express')
const router = express.Router()

const Member = require('../controllers/member/api_controller')
const member = new Member()
const MemberModifyMethod = require('../controllers/member/modify_controller')
const memberModifyMethod = new MemberModifyMethod()

router.get('/', member.getUserName)

router.get('/register', member.checkRegister)

router.post('/register', memberModifyMethod.postRegister)

router.post('/login', memberModifyMethod.postLogin)

router.put('/update', memberModifyMethod.postUpdate)

router.put('/updateimg', memberModifyMethod.updateImg)

module.exports = router
