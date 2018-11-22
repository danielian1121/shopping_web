const modifyProduct = require('../../models/product/modify_model')
const should = require('should')
const onTime = require('../../models/onTime')

describe('#modifyProduct', () => {
  it('should return 1 when update sucessfully', async () => {
    const result = await modifyProduct(2, { update_date: onTime() })
    result[0].should.equal(1)
  })
  it('should return 0 when update failed', async () => {
    const result = await modifyProduct(1, { update_date: onTime() })
    result[0].should.equal(0)
  })
})
