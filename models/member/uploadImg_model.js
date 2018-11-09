const config = require('../../config/development_config')
const fs = require('fs')
const rp = require('request-promise')
module.exports = function uploadImg (file) {
  return new Promise((resolve, reject) => {
    let setting = {
      method: 'POST',
      url: 'https://api.imgur.com/3/image',
      json: true,
      formData: {
        image: fs.createReadStream(file.path),
        'title': file.title,
        'name': file.name,
        'type': file.type
      },
      headers: {
        Authorization: config.imgToken
      }
    }
    rp(setting).then(result => resolve(result.data.link))
      .catch(() => reject(new Error('照片上傳失敗')))
  })
}
