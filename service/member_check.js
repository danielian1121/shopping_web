module.exports = class CheckCustomer {
  // 判斷email格式
  checkEmail (email) {
    return new Promise((resolve, reject) => {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const result = re.test(email)
      result ? resolve() : reject(new Error('請輸入正確的Eamil格式。(如1234@email.com)'))
    })
  }
  checkRegisterinfo ({ name = '', email = '', password = '' } = {}) {
    return new Promise((resolve, reject) => {
      if (name && email && password) resolve()
      else reject(new Error('請輸入完整的資料'))
    })
  }
  checkLogininfo ({ email = '', password = '' } = {}) {
    return new Promise((resolve, reject) => {
      if (email && password) resolve()
      else reject(new Error('請輸入完整的資料'))
    })
  }
}
