const router = require('koa-router')()
const userService = require('../service/users/index')

router.post('/login', async (ctx, next) => {
  const params = ctx.request.body
  try{
    const res = await userService.checkUserIsExist(params)
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

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
