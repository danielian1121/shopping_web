const checkExistOrderId = require('../../models/order/check_exit_orderId_model')
const should = require('should')

describe('#checkOrderIdExist', () => {
  it('should return memberId(38) where orderId = 1', async () => {
    const result = await checkExistOrderId(1, 38)
    result[0].dataValues.memberId.should.equal(38)
  })
})
