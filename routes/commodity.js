const router = require('koa-router')()
const commodityService = require('../service/commodity/index')
const commonResult = require('./utils/commonResult')

router.post('/commodity', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const id = await commodityService.addCommodity(params)
    commonResult.success(ctx, id)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.get('/commodity-list', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const rows = await commodityService.queryCommodityByConditionsAndPage(params)
    commonResult.success(ctx, rows)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.put('/commodity', async (ctx, next) => {
  const params = ctx.request.body
  try {
    await commodityService.modifyCommodityById(params)
    commonResult.success(ctx, rows)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.del('/commodity/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await commodityService.deleteCommodityById(id)
    commonResult.success(ctx, rows)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.get('/commodity-dic', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await commodityService.queryAllCommodity(params)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

module.exports = router