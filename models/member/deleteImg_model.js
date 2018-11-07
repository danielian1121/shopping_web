const config = require('../../config/development_config')
const db = require('../connection_db').memberInfo
const rp = require('request-promise')

module.exports = function deleteImg (id) {
  return new Promise((resolve, reject) => {
    db.findByPk(id).then(result => {
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
      rp(setting).then(result => resolve(result.success))
        .catch(err => reject(err))
    })
  })
}
