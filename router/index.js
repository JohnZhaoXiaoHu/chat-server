const Router = require('koa-router')
const router = new Router()
const { Sign, Chat } = require('../controller')

router.post('/user', Sign.join)
router.post('/login', Sign.login)

// get user info
router.get('/user/:id', Sign.user)

// add chat
router.get('/chat', Chat.get)
router.post('/chat/:id', Chat.add)

module.exports = router
