import style from '../../../dist/css/product/index.css'
import header from '../component/common/header'

const allProductUrl = `${document.location.protocol}//${document.location.host}/api/${document.location.pathname}`
const productView = document.getElementById('product')

fetch(allProductUrl)
    .then(res => res.json())
    .then(result => {
      productView.innerHTML = result.rows[0].name
    })