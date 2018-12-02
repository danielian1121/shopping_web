const express = require('express')
const router = express.Router()

router.get(/^\/$/, (req,res) => {
  res.sendFile(`${global.projectRoot}/static/dist/html/home/index.html`)
})

module.exports = router
