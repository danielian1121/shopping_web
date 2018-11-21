import swal from 'sweetalert2/dist/sweetalert2.js'
import style from '../../../dist/css/redirect/index.css'

let timerInterval
let time = 5
swal({
  title: '驗證成功',
  html: '將在 <strong></strong> 秒後跳轉頁面',
  timer: 5000,
  onOpen: () => {
    swal.showLoading()
    timerInterval = setInterval(() => {
      swal.getContent().querySelector('strong')
        .textContent = time--
    }, 1000)
  },
  onClose: () => {
    clearInterval(timerInterval)
    window.location.href = `${document.location.protocol}//${document.location.host}`
  }
})
// TODO: Fix timer
