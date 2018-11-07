const express = require('express')
const router = express.Router()

const MemberModifyMethod = require('../controllers/member/modify_controller')
const memberModifyMethod = new MemberModifyMethod()

router.post('/register', memberModifyMethod.postRegister)

router.post('/login', memberModifyMethod.postLogin)

router.put('/update', memberModifyMethod.postUpdate)

router.put('/updateimg', memberModifyMethod.updateImg)

module.exports = router
