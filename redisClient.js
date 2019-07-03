const redis = require('redis')
const logger = require('./utils/logger')

const redisClient = redis.createClient(process.env.REDIS_URL)

redisClient.on('error', err => {
  logger.error(err.message || err.errmsg)
})

redisClient.on('connect', () => {
  logger.info(`Successfully connected to REDIS_URL: ${process.env.REDIS_URL}`)
})

module.exports = redisClient