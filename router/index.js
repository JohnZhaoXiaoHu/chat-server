const Router = require('koa-router')
const router = new Router()
const { Sign } = require('../controller')

router.post('/user', Sign.join)

module.exports = router
