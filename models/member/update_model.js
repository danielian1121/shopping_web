const member = require('../connection_db').memberInfo
const encryption = require('./encryption_model')

module.exports = function memberEdit (id, inputData) {
  return new Promise((resolve, reject) => {
    let updateDate = {}
    Object.keys(inputData).map((objKey) => {
      if (inputData[objKey]) updateDate[objKey] = inputData[objKey]
    })
    encryption(updateDate.password)
      .then(password => {
        updateDate.password = password
        return member.update(updateDate, {
          where: {
            id: id
          }
        })
      })
      .catch(() => {
        return member.update(updateDate, {
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
