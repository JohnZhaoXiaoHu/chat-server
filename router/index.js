const Router = require('koa-router')
const router = new Router()
const { Sign } = require('../controller')

router.post('/user', Sign.join)
router.post('/login', Sign.login)
router.get('/user/:id', Sign.user)

module.exports = router
