const router = require('koa-router')()
const userService = require('../service/users/index')
const commonResult = require('./utils/commonResult')

router.post('/login', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const data = await userService.checkUserIsExist(params)
    ctx.session.loginStatus = true
    ctx.session.userId = data.id
    commonResult.success(ctx, data, '登录成功')
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.get('/logout', async (ctx, next) => {
  delete ctx.session.loginStatus
  delete ctx.session.userId
  commonResult.success(ctx, '', '登出成功')
})

router.put('/users-password', async (ctx, next) => {
  const params = ctx.request.body
  const userId = ctx.session.userId
  try {
    await userService.modifyPassword(params, userId)
    commonResult.success(ctx)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.put('/users-nickname', async (ctx, next) => {
  const params = ctx.request.body
  const userId = ctx.session.userId
  try {
    await userService.modifyPassword(params, userId)
    commonResult.success(ctx)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.get('/users-dic', async (ctx, next) => {
  try {
    const data = await userService.queryAllUsers()
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

module.exports = router
