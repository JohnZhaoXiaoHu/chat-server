const koa = require('koa')
const app = new koa()
const server = require('http').createServer(app.callback())
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

require('./models')

const router = require('./router')
app.use(router.routes()).use(router.allowedMethods())

server.listen(3000, () => {
  console.log('server is running')
})
