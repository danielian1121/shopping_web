const verifyToken = require('../../models/member/verification_model')
const getMemberData = require('../../models/member/get_member_model')
const checkRegister = require('../../models/member/check_register_model')

module.exports = class Member {
  getUserName (req, res, next) {
    verifyToken(req.signedCookies.token)
      .then(id => getMemberData(id))
      .then(data => {
        res.json({
          name: data.name
        })
      })
  }
  checkRegister (req, res, next) {
    const data = {
      verification: 1
    }
    const condition = {
      id: req.query.id,
      code: req.query.code
    }
    checkRegister(condition, data)
      .then(data => {
        if (data[0]) {
          res.sendFile(`${global.projectRoot}/static/dist/html/redirect/index.html`)
        } else {
          res.status = 403
          res.json({
            data
          })
        }
      })
      .catch(e => {
        res.json({
          error: e
        })
      })
  }
}
