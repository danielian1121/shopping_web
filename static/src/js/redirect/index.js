import swal from 'sweetalert2/dist/sweetalert2.js'
import style from '../../../dist/css/redirect/index.css'

let timerInterval
let time = 5
swal({
  title: '驗證成功',
  html: '即將跳轉頁面',
  timer: 3000,
  onOpen: () => {
    swal.showLoading()
    timerInterval = setInterval(() => {}, 1000)
  },
  onClose: () => {
    clearInterval(timerInterval)
    window.location.href = `${document.location.protocol}//${document.location.host}`
  }
})
