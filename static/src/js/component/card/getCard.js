import card from '../../../pug/component/card/getCard.pug'

const allProductUrl = `${location.protocol}//${location.host}/api/product`

export default target => {
  fetch(allProductUrl)
    .then(res => res.json())
    .then(result => {
      let data = result.rows
      target.innerHTML = card({data})
    })
}