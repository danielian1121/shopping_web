const toRegister = require('../../models/member/register_model')
const Check = require('../../service/member_check')
const encryption = require('../../models/member/encryption_model')
const loginAction = require('../../models/member/login_model')
const config = require('../../config/development_config')
const jwt = require('jsonwebtoken')
const verify = require('../../models/member/verification_model')
const updateAction = require('../../models/member/update_model')
const formidable = require('formidable')
const uploadImg = require('../../models/member/uploadImg_model')
const deleteImg = require('../../models/member/deleteImg_model')
const check = new Check()

module.exports = class Member {
  postRegister (req, res) {
    let memberData = {
      id: '',
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      create_date: onTime()
    }
    check.checkRegisterinfo(memberData)
      .then(() => {
        return encryption(memberData.password)
      })
      .then(password => {
        memberData.password = password
        return check.checkEmail(memberData.email)
      })
      .then(() => {
        return toRegister(memberData)
      })
      .then(data => {
        res.json({
          status: '註冊成功。',
          result: data
        })
      })
      .catch(e => {
        res.json({
          status: '註冊失敗。',
          err: e.message
        })
      })
  }

  postLogin (req, res) {
    let memberData = {
      email: req.body.email,
      password: req.body.password
    }
    check.checkLogininfo(memberData)
      .then(() => {
        return encryption(memberData.password)
      })
      .then(password => {
        memberData.password = password
        return loginAction(memberData)
      })
      .then(data => {
        const token = jwt.sign({
          algorithm: 'HS256',
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
          data: data.id
        }, config.secret) // 需要再另外設置key
        res.setHeader('token', token)
        res.json({
          result: {
            status: '登入成功。',
            loginMember: `歡迎${data.name}的登入!`
          }
        })
      })
      .catch(e => {
        res.json({
          result: {
            status: '登入失敗',
            err: e.message
          }
        })
      })
  }

  postUpdate (req, res) {
    const token = req.headers['token']
    if (!token) {
      res.json({
        status: '更新失敗',
        err: '請重新登入。'
      })
    } else {
      let memberUpdateData = {
        name: req.body.name,
        password: req.body.password,
        update_date: onTime()
      }
      verify(token)
        .then(result => {
          return updateAction(result, memberUpdateData)
        })
        .then(() => {
          res.json({
            result: {
              test: '更改完成'
            }
          })
        })
        .catch(e => {
          res.json({
            result: {
              status: '更新失敗',
              err: e.message
            }
          })
        })
    }
  }

  updateImg (req, res) {
    let token = req.headers['token']
    if (!token) {
      res.json({
        status: '更新失敗',
        err: '請重新登入。'
      })
    } else {
      verify(token).then(result => {
        let id = result
        let form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
          if (err) {
            res.json({
              status: '更新失敗',
              err: '請稍後再試'
            })
          } else if (files.file.size >= 1 * 1024 * 1024) {
            res.json({
              status: '更新失敗',
              err: '照片超過 1MB'
            })
          } else if (files.file.type !== 'image/png' && files.file.type !== 'image/jpg' && files.file.type !== 'image/jpeg') {
            res.json({
              status: '更新失敗',
              err: '請上傳正確的照片類型'
            })
          } else {
            deleteImg(id)
              .then(() => {
                let fileInfo = {
                  path: files.file.path,
                  title: files.file.name,
                  name: files.file.name,
                  type: files.file.type
                }
                return uploadImg(fileInfo)
              })
              .then(path => {
                let memberUpdateData = {
                  img: path,
                  update_date: onTime()
                }
                return updateAction(id, memberUpdateData)
              })
              .then(() => {
                res.json({
                  result: {
                    status: '照片更新完成'
                  }
                })
              })
              .catch(e => {
                res.json({
                  status: '更新失敗',
                  err: e.message
                })
              })
          }
        })
      })
    }
  }
}

// 取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
  const date = new Date()
  const mm = date.getMonth() + 1
  const dd = date.getDate()
  const hh = date.getHours()
  const mi = date.getMinutes()
  const ss = date.getSeconds()

  return [date.getFullYear(), '-' +
    (mm > 9 ? '' : '0') + mm, '-' +
    (dd > 9 ? '' : '0') + dd, ' ' +
    (hh > 9 ? '' : '0') + hh, ':' +
    (mi > 9 ? '' : '0') + mi, ':' +
    (ss > 9 ? '' : '0') + ss
  ].join('')
}
