const redisClient = require('../../redisClient')
const User = require('../../models/user')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  let { username, email, password } = req.body

  try {
    let hashedPassword = bcrypt.hashSync(password)

    let userData = { username, email, password: hashedPassword }
    let user = await User.create(userData)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  let { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    // Check if user exists
    if (!user) {
      return res.status(401).send('Invalid Credentials')
    }

    // Compare password
    let passwordsMatch = bcrypt.compareSync(password, user.password)
    if (passwordsMatch) {
      // Create Token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
      
      // Save token as key on redis, user id as value
      redisClient.set(token, user._id, () => {
        return res.json({ token })
      })

    } else {
      return res.status(401).send('Invalid Credentials')
    }


  } catch (err) {
    next(err)
  }
}

exports.getKey = (req, res, next) => {
  let { token = '' } = req.query

  redisClient.get(token, (err, reply) => {
    res.json({ err, reply })
  })
}
