const verifyToken = require('../../models/member/verification_model')
const getMemberData = require('../../models/member/get_member_model')

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
}
