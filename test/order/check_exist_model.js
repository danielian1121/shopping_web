const checkExist = require('../../models/order/check_exist_model')
const should = require('should')

describe('#checkOrderExist', () => {
  it('should return memberId(38) where orderId = 1 and memberId = 38 and productId = 2', async () => {
    const result = await checkExist(1, 38)
    result[0].dataValues.memberId.should.equal(38)
  })
  it('should return 找不到此訂單 where orderId = 0', async () => {
    try {
      const result = await checkExist(0, 38, 2)
    } catch (e) {
      e.message.should.equal('找不到此訂單')
    }
  })
})
