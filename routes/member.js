const express = require('express')
const router = express.Router()

const MemberModifyMethod = require('../controllers/modify_controller')
memberModifyMethod = new MemberModifyMethod()

router.post('/register', memberModifyMethod.postRegister)

router.post('/login', memberModifyMethod.postLogin)

router.put('/update', memberModifyMethod.postUpdate)

router.put('/updateimg', memberModifyMethod.updateImg)

module.exports = router
