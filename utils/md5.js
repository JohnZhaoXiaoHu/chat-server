const crypto = require('crypto')

function md5(str) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex')
}

function compare(str, hash) {
  return (
    crypto
      .createHash('md5')
      .update(str)
      .digest('hex') === hash
  )
}

md5.compare = compare

module.exports = md5
