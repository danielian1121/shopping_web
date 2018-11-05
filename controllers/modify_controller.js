const toRegister = require('../models/register_model')
const Check = require('../service/member_check');
const encryption = require('../models/encryption')
const loginAction = require('../models/login_model')
const config = require('../config/development_config')
const jwt = require('jsonwebtoken')
const verify = require('../models/verification_model')
const updateAction = require('../models/update_model')
check = new Check();

module.exports = class Member {
	postRegister(req, res, next) {
		const password = encryption(req.body.password)
		// 獲取client端資料
		const memberData = {
			id: '',
			name: req.body.name,
			email: req.body.email,
			password: password,
			create_date: onTime()
		}
		const checkEmail = check.checkEmail(memberData.email)
		if (!checkEmail) {
			res.json({
				result: {
					status: "註冊失敗。",
					err: "請輸入正確的Eamil格式。(如1234@email.com)"
				}
			})
		} else {
			// 將資料寫入資料庫
			toRegister(memberData).then(result => {
				// 若寫入成功則回傳
				res.json({
					status: "註冊成功。",
					result: result
				})
				}, (err) => {
					// 若寫入失敗則回傳
					res.json({
						result: err
				})
			})
		}
	}
	postLogin(req, res, next) {
		let password = encryption(req.body.password)
		let memberData = {
			email: req.body.email,
			password: password
		}
		loginAction(memberData).then(data => {
			let token = jwt.sign({
				algorithm: 'HS256',
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
        data: data.id
			}, config.secret) //需要再另外設置key
			res.setHeader('token', token)
			res.json({
				result: {
					status: "登入成功。",
          loginMember: `歡迎${ data.name }的登入!`,
				}
			})
		}).catch(() => {
			res.json({
				result: {
					status: "登入失敗。",
					err: "請輸入正確的帳號或密碼。"
				}
			})
		})
	}
	postUpdate(req, res, next) {
		let token = req.headers['token']
		if (!token) {
			res.json({
				err: '請輸入token'
			})
		} else {
			verify(token).then(result => {
				let id = result
				let password = encryption(req.body.password)
				let memberUpdateData = { //要修改成根據body有什麼而修改什麼
					name: req.body.name,
					password: password,
					update_date: onTime()
				}
				updateAction(id, memberUpdateData).then(result => {
					res.json({
						result: {
							test: '更改完成'
						}
					})
				}).catch(err => {
					res.json({
						result: {
							test: '錯誤'
						}
					})
				})
			}).catch(err => {
				res.json({
					result: {
						status: "token錯誤。",
						err: "請重新登入。"
					}
				})
			})
		}
	}
}

//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
	const date = new Date()
	const mm = date.getMonth() + 1
	const dd = date.getDate()
	const hh = date.getHours()
	const mi = date.getMinutes()
	const ss = date.getSeconds()

	return [date.getFullYear(), "-" +
		(mm > 9 ? '' : '0') + mm, "-" +
		(dd > 9 ? '' : '0') + dd, " " +
		(hh > 9 ? '' : '0') + hh, ":" +
		(mi > 9 ? '' : '0') + mi, ":" +
		(ss > 9 ? '' : '0') + ss
	].join('')
}