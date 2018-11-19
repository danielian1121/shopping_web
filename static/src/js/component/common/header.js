import LoginElement from '../../../pug/component/common/login.pug'
const login = document.getElementsByClassName('link__login')
const content = document.getElementsByClassName('content')
const getMemberName = `${location.protocol}//${location.host}/api/member`

function addLoginScreen () {
  if (document.getElementsByClassName('loginScreen').length !== 1) {
    content[0].innerHTML += LoginElement()
  }
}

login[0].addEventListener('click', addLoginScreen)

fetch(getMemberName)
  .then(res => res.json())
  .then(result => {
    login[0].innerHTML = result.name
    login[0].removeEventListener('click', addLoginScreen)
  })
