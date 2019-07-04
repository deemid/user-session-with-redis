const express = require('express')
const router = express.Router()

const auth = require('./controllers/auth')

router.get('/', async (req, res, next) => {
  res.send('hello')
})

router.post('/register', auth.register)
router.post('/login', auth.login)

router.get('/redis', auth.getKey)

module.exports = router
