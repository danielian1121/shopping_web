const config = require('../../config/development_config')
const checkOrderExist = require('./check_exist_model')
const getProduct = require('../product/get_product')
const updateProduct = require('../product/modify_model')
const getMember = require('../member/get_member_model')
const transporter = require('../connection_mail')
const updateOrder = require('../order/update_model')

module.exports = (orderId, memberId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderList = await checkOrderExist(orderId, memberId)
      if (orderList[0].dataValues.isComplete === 1) throw new Error('此訂單已完成')
      let productIds = {}
      for (let value of orderList) {
        const productId = value.dataValues.productId
        const productData = await getProduct(productId)
        const quantity = productData.quantity
        if (quantity < value.dataValues.orderQuantity) throw new Error('此商品已沒有庫存')
        productIds[productId] = value.dataValues.orderQuantity - quantity
      }
      await updateOrder({ isComplete: 1 }, { orderId: orderId })
      await Object.keys(productIds).map((key, value) => {
        const updateData = {
          quantity: value,
          update_date: onTime()
        }
        updateProduct(key, updateData)
      })
      const memberData = await getMember(memberId)
      const mailOptions = {
        from: `"企鵝購物網" <${config.mailUser}>`,
        to: config.mailUser,
        subject: memberData.name + '您好，您所購買的訂單已經完成。',
        html: `<p>Hi, ${memberData.name} </p>` + `<br>` + `<br>` + `<span>感謝您訂購<b>企鵝購物網</b>的商品，歡迎下次再來！</span>` // 內文
      }
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err)
          throw new Error(`${err.message}`)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
      })
      const result = `訂單編號： ${orderId} 付款已完成，謝謝您使用該服務！詳細的訂單資訊已寄送至 ${memberData.email}`
      resolve(result)
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })
}
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
