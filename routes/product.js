const express = require('express')
const router = express.Router()

router.get(/^\/[0-9]+$/, (req,res) => {
  res.sendFile(`${global.projectRoot}/static/dist/html/product/index.html`)
})

module.exports = router
