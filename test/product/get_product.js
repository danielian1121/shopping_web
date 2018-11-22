const getProduct = require('../../models/product/get_product')
const should = require('should')

describe('#getProduct', () => {
  it('should return 逗貓棒 where id = 2', async () => {
    const data = await getProduct(2)
    data.name.should.equal('逗貓棒')
  })
  it('should return 獲取商品價格時發生錯誤 where id is not in DB', async () => {
    try {
      await getProduct(1)
    } catch (e) {
      e.message.should.equal('獲取商品價格時發生錯誤')
    }
  })
})
