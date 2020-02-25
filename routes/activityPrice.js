const router = require('koa-router')()
const activityPriceService = require('../service/activityPrice/index')
const commonResult = require('./utils/commonResult')

router.post('/activity-price', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const id = await activityPriceService.insertActivityPrice(params)
    commonResult.success(ctx, id)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.get('/activity-price-list-all', async (ctx, next) => {
  const params = ctx.request.query
  const commodityId = params.commodityId
  try {
    const data = await activityPriceService.queryAllActivityPriceByCommodityId(commodityId)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.put('/activity-price', async (ctx, next) => {
  const params = ctx.request.body
  try {
    await activityPriceService.modifyActivityPriceById(params)
    commonResult.success(ctx)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.del('/activity-price/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await activityPriceService.deleteActivityPriceById(id)
    commonResult.success(ctx)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

module.exports = router