const { User } = require('../models')
const { md5, validator } = require('../utils')

exports.join = async (ctx, next) => {
  let { username, password, email } = ctx.request.body
  username = username.trim && username.trim()
  password = password.trim && password.trim()
  email = email.trim && email.trim()

  if ([username, password].some(value => !value)) {
    ctx.body = ctx.response
    ctx.response.status = 404
    return
  }

  // TODO: unique username

  const user = new User()
  user.username = username
  user.password = md5(password)
  user
    .save()
    .then(user => {
      console.log(user)
      ctx.response.status = 201
      ctx.body = user
    })
    .catch(err => {
      console.log(err)
      ctx.response.status = 500
      ctx.body = err
    })
}
