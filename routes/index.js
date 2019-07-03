const express = require('express')
const router = express.Router()

const redisClient = require('../redisClient')

router.get('/', function(req, res, next) {
  res.send('Hello World!')
})

module.exports = router
