const orderAllProduct = require('../../models/order/order_all_porduct_model')
const should = require('should')
const onTime = require('../../models/onTime')

describe('#orderAllProduct', () => {
  it('should return memberId', async () => {
    let orderList = {
      memberId: 38,
      productId: '2',
      quantity: '4',
      orderDate: onTime()
    }
    const resolve = await orderAllProduct(orderList)
    resolve[0].memberId.should.equal(orderList.memberId)
  })
})
