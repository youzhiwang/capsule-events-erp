const router = require('koa-router')()
const storageInService = require('../service/storageIn/index')

router.post('/storage-in', async (ctx, next) => {
  const params = ctx.request.body
  const userId = ctx.session.userId
  try {
    const data = await storageInService.insertStorageIn(params, userId)
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

router.get('/storage-in', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await storageInService.queryStorageInRecordByPageAndConditions(params)
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
