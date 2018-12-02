const productData = require('../../models/product/all_product_model')
const url  = require('url')

module.exports = class GetProduct {
  getAllProduct (req, res) {
    productData()
      .then(rows => {
        res.json({
          status: '取得全部商品資料成功',
          rows
        })
      })
      .catch(e => {
        res.json({
          status: '取得全部商品資料失敗',
          err: e.message
        })
      })
  }
  getOneProduct (req, res) {
    const id = req.url.replace('/', '')
    console.log(id)
  }
}
