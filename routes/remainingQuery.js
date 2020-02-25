const router = require('koa-router')()
const remainingQueryService = require('../service/remainingQuery/index')
const commonResult = require('./utils/commonResult')

// 查询商品库存量
router.get('/remaining-query', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await remainingQueryService.queryAmount(params)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e.message)
  }
})

// 修改商品库存量
router.put('/remaining-query', async (ctx, next) => {
  const params = ctx.request.body
  const userId = ctx.session.userId
  try {
    await remainingQueryService.modifyCommodityAmount(params, userId)
    commonResult.success(ctx)
  } catch (e) {
    commonResult.fail(ctx, e.message)
  }
})


module.exports = router