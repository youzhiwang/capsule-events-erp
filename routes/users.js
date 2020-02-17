const router = require('koa-router')()
const userService = require('../service/users/index')

router.post('/login', async (ctx, next) => {
  const params = ctx.request.body
  try{
    const res = await userService.checkUserIsExist(params)
    ctx.session.loginStatus = true
    ctx.body = {
      code: 'success',
      data: res,
      message: '登录成功'
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      data: '',
      message: e
    }
  }
})

router.get('/logout', async (ctx, next) => {
  delete ctx.session.loginStatus
  ctx.body = {
    code: 'success',
    data: '',
    message: '登出成功'
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
