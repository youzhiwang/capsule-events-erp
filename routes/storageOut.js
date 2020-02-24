const router = require('koa-router')()
const storageOutService = require('../service/storageOut/index')

// 新增出库记录
router.post('/storage-out', async (ctx, next) => {
  const params = ctx.request.body
  const userId = ctx.session.userId
  try {
    const data = await storageOutService.insertStorageOut(params, userId)
    ctx.body = {
      code: 'success',
      data,
      message: ''
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      data: '',
      message: e.message
    }
  }
})

// 分页查询出库记录列表
router.get('/storage-out', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await storageOutService.queryStorageOutRecordByPageAndConditions(params)
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
