const mail = require('../connection_mail')

module.exports = (mailOption) => {
  return mail.sendMail(mailOption)
}
