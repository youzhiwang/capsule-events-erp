const router = require('koa-router')()
const costService = require('../service/cost/index')
const commonResult = require('./utils/commonResult')

router.post('/cost', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const data = await costService.insertCost(params)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.get('/cost-list', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await costService.queryCostListByPage(params)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.put('/cost', async (ctx, next) => {
  const params = ctx.request.body
  try {
    await costService.updateCostById(params)
    commonResult.success(ctx)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.del('/cost/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await costService.deleteCostById(id)
    commonResult.success(ctx)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

module.exports = router