const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, err => {
  if (err) {
    logger.error(err.message || err.errmsg)
  } else {
    logger.info(`Successfully connected to: ${process.env.MONGODB_URI}`)
  }
})
