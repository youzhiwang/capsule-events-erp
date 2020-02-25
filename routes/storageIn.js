const router = require('koa-router')()
const storageInService = require('../service/storageIn/index')
const commonResult = require('./utils/commonResult')

router.post('/storage-in', async (ctx, next) => {
  const params = ctx.request.body
  const userId = ctx.session.userId
  try {
    const data = await storageInService.insertStorageIn(params, userId)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.get('/storage-in', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await storageInService.queryStorageInRecordByPageAndConditions(params)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

module.exports = router
