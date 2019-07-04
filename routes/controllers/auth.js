const redisClient = require('../../redisClient')
const User = require('../../models/user')

const bcrypt = require('bcryptjs')

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
