const router = require('koa-router')()
const storageOutService = require('../service/storageOut/index')
const commonResult = require('./utils/commonResult')

// 新增出库记录
router.post('/storage-out', async (ctx, next) => {
  const params = ctx.request.body
  const userId = ctx.session.userId
  try {
    const data = await storageOutService.insertStorageOut(params, userId)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

// 分页查询出库记录列表
router.get('/storage-out', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await storageOutService.queryStorageOutRecordByPageAndConditions(params)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

module.exports = router
