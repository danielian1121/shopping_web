const allOrder = require('../../models/order/all_order_model')
const should = require('should')

describe('#allOrder', () => {
  it('should return memberId(38) where orderId = 1', async () => {
    const rows = await allOrder()
    rows[0].memberId.should.equal(38)
  })
})
