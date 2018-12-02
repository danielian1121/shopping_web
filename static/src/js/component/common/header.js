import swal from 'sweetalert2/dist/sweetalert2.js'
const getMemberName = `${document.location.protocol}//${document.location.host}/api/member`
const login = document.getElementsByClassName('link__login')

const postFetch = (url, data) => {
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // *client, no-referrer
  })
}

function registerAlert () {
  return swal({
    title: '註冊',
    html:
      '<input type="text" name="name" placeholder="Name" id="swal-input0" class="swal2-input">' +
      '<input type="email" name="email" placeholder="Email" id="swal-input1" class="swal2-input">' +
      '<input type="password" name="password" placeholder="Password" id="swal-input2" class="swal2-input">',
    confirmButtonText: '註冊',
    showCancelButton: true,
    cancelButtonClass: 'btn btn-danger',
    cancelButtonText: '前往登入畫面',
    focusConfirm: false,
    showLoaderOnConfirm: true,
    preConfirm: (formValues) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const name = document.getElementById('swal-input0').value
      const email = document.getElementById('swal-input1').value
      const password = document.getElementById('swal-input2').value
      if (!email || !password || !name) {
        swal.showValidationMessage(
          '請確認每項都有填入資料'
        )
        return false
      } else if (!re.test(String(email).toLowerCase())) {
        swal.showValidationMessage(
          '無效的Email格式'
        )
        return false
      }
      const postUrl = `${document.location.protocol}//${document.location.host}/api/member/register`
      const loginData = {
        name,
        email,
        password
      }
      return postFetch(postUrl, loginData)
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.error) {
            throw new Error(data.error)
          }
        })
        .catch(e => {
          swal.showValidationMessage(
            `${e}`
          )
        })
    }
  }).then(result => {
    if (result.value) {
      let timerInterval
      swal({
        title: '註冊成功',
        timer: 3000,
        text: '請前往信箱驗證帳號',
        showConfirmButton: false,
        onOpen: () => {
          timerInterval = setInterval(() => {}, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      })
      console.log(result)
    } else if (result.dismiss === swal.DismissReason.cancel) {
      addLoginScreen()
    }
  })
}

function addLoginScreen () {
  swal({
    title: '登入',
    html:
      '<input type="email" name="email" placeholder="Email" id="swal-input1" class="swal2-input">' +
      '<input type="password" name="password" placeholder="Password" id="swal-input2" class="swal2-input">',
    confirmButtonText: '登入',
    showCancelButton: true,
    cancelButtonClass: 'btn btn-danger',
    cancelButtonText: '前往註冊畫面',
    focusConfirm: false,
    showLoaderOnConfirm: true,
    preConfirm: (formValues) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const email = document.getElementById('swal-input1').value
      const password = document.getElementById('swal-input2').value
      if (!email || !password) {
        swal.showValidationMessage(
          '帳號密碼不得為空'
        )
        return false
      } else if (!re.test(String(email).toLowerCase())) {
        swal.showValidationMessage(
          '無效的Email格式'
        )
        return false
      }
      const postUrl = `${document.location.protocol}//${document.location.host}/api/member/login`
      const loginData = {
        email,
        password
      }
      return postFetch(postUrl, loginData)
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.error) {
            throw new Error(data.error)
          }
        })
        .catch(e => {
          swal.showValidationMessage(
            `${e}`
          )
        })
    }
  }).then(result => {
    if (result.value) {
      let timerInterval
      swal({
        title: '登入成功',
        timer: 1000,
        showConfirmButton: false,
        onOpen: () => {
          timerInterval = setInterval(() => {}, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
          document.location.reload()
        }
      })
      console.log(result)
    } else if (result.dismiss === swal.DismissReason.cancel) {
      registerAlert()
    }
  })
}
login[0].addEventListener('click', addLoginScreen)

fetch(getMemberName)
  .then(res => res.json())
  .then(result => {
    login[0].innerHTML = result.name
    login[0].removeEventListener('click', addLoginScreen)
  })
