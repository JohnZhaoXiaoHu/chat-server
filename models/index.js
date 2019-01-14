const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(config.db)

const db = mongoose.connection
db.on('error', () => {
  console.error(`connect to ${config.db} error: ${err.message}`)
  process.exit(1)
})
db.once('open', function() {
  console.log(`connect to ${config.db} success`)
})

exports.User = require('./user')
exports.Chat = require('./chat')
