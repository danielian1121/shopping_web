const updateOrder = require('../../models/order/update_model')
const should = require('should')

describe('#modifyProduct', () => {
  it('should return 1 when update sucessfully', async () => {
    let condition = {
      orderId: 1,
      productId: 2,
      memberId: 38
    }
    let updateData = {
      orderQuantity: 3,
      orderPrice: 36
    }
    const result = await updateOrder(updateData, condition)
    result[0].should.equal(1)
  })
  it('Restore', async () => {
    let condition = {
      orderId: 1,
      productId: 2,
      memberId: 38
    }
    let updateData = {
      orderQuantity: 4,
      orderPrice: 48
    }
    const result = await updateOrder(updateData, condition)
    result[0].should.equal(1)
  })
})
