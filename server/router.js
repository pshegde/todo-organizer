

'use strict'

const express = require('express')
let router = express.Router()
const path = require('path')
router.use(express.static(path.join(__dirname, '../dist')))

router = require('./controllers/categories')(router)
router.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') })
})

module.exports = router