import card from '../../../pug/component/card/getCard.pug'

const allProductUrl = `${document.location.protocol}//${document.location.host}/api/product`

export default target => {
  fetch(allProductUrl)
    .then(res => res.json())
    .then(result => {
      target.innerHTML = card({ data: result.rows })
    })
}
