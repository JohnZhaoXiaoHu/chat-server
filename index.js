const koa = require('koa')
const app = new koa()
const server = require('http').createServer(app.callback())

require('./models')

const router = require('./router')
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', '*')
  ctx.set('Access-Control-Allow-Methods', '*')
  await next()
})

app.use(router.routes()).use(router.allowedMethods())

server.listen(8080, () => {
  console.log('server is running')
})
