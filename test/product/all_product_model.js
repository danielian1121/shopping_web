const allProduct = require('../../models/product/all_product_model')
const should = require('should')

describe('#allProduct', () => {
  it('should return 2 where id = 2', async () => {
    const rows = await allProduct()
    rows[0].id.should.equal(2)
  })
})
