const express = require('express')
const router = express.Router()

const auth = require('./controllers/auth')

router.get('/', async (req, res, next) => {
  res.send('hello')
})

router.post('/register', auth.register)

module.exports = router
