const member = require('../connection_db').member
const encryption = require('./encryption_model')

module.exports = function memberEdit (id, inputData) {
  return new Promise((resolve, reject) => {
    let updateData = {}
    Object.keys(inputData).map((objKey) => {
      if (inputData[objKey]) updateData[objKey] = inputData[objKey]
    })
    encryption(updateData.password)
      .then(password => {
        updateData.password = password
        return member.update(updateData, {
          where: {
            id: id
          }
        })
      })
      .catch(() => {
        return member.update(updateData, {
          where: {
            id: id
          }
        })
      })
      .then(result => {
        resolve(result)
      })
      .catch(() => {
        reject(new Error('更新時發生錯誤，請稍後再試'))
      })
  })
}
