const deleteOrder = require('../../models/order/delete_model')
const should = require('should')

describe('#deleteOrder', () => {
  it('should return 1 when delete sucessfully', async () => {
    let orderList = {
      memberId: 38,
      productId: 2,
      orderId: 2
    }
    const rows = await deleteOrder(orderList)
    rows.should.equal(1)
  })
  it('should return 0 when delete failed', async () => {
    let orderList = {
      memberId: 38,
      productId: 2,
      orderId: 0
    }
    const rows = await deleteOrder(orderList)
    rows.should.equal(0)
  })
})
