const config = require('../../config/development_config')
const member = require('../connection_db').member
const rp = require('request-promise')

module.exports = function deleteImg (id) {
  return new Promise((resolve, reject) => {
    member.findByPk(id).then(result => {
      let path = result.dataValues.img
      let res = path.split('/')[3].split('.')[0]
      let setting = {
        method: 'DELETE',
        url: `https://api.imgur.com/3/image/${res}`,
        json: true,
        headers: {
          Authorization: config.imgToken
        }
      }
      return rp(setting)
    }).then(result => resolve(result.success))
      .catch(() => reject(new Error('照片刪除失敗')))
  })
}
