const router = require('koa-router')()
const userService = require('../service/users/index')

router.post('/login', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const data = await userService.checkUserIsExist(params)
    ctx.session.loginStatus = true
    ctx.session.userId = data.id
    ctx.body = {
      code: 'success',
      data,
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
  delete ctx.session.userId
  ctx.body = {
    code: 'success',
    data: '',
    message: '登出成功'
  }
})

router.put('/users-password', async (ctx, next) => {
  const params = ctx.request.body
  const userId = ctx.session.userId
  try {
    await userService.modifyPassword(params, userId)
    ctx.body = {
      code: 'success',
      data: '',
      message: ''
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      data: '',
      message: ''
    }
  }
})

router.put('/users-nickname', async (ctx, next) => {
  const params = ctx.request.body
  const userId = ctx.session.userId
  try {
    await userService.modifyPassword(params, userId)
    ctx.body = {
      code: 'success',
      data: '',
      message: ''
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      data: '',
      message: ''
    }
  }
})

router.get('/users-dic', async (ctx, next) => {
  try {
    const data = await userService.queryAllUsers()
    ctx.body = {
      code: 'success',
      data,
      message: ''
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      data: '',
      message: e
    }
  }
})

module.exports = router
