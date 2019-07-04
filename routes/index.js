const express = require('express')
const router = express.Router()

const redisClient = require('../redisClient')

const User = require('../models/user')

router.get('/', async (req, res, next) => {
  let { username = '' } = req.query
  console.log(username)
  if (username) {
    try {
      await User.create({ username })
      res.send(`Hello ${username}!`)
    } catch (err) {
      console.log(err)
      next (err)
    }
  } else {
    res.send('No username')
  }

})

module.exports = router
