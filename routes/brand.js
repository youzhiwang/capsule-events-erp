const router = require('koa-router')()
const brandService = require('../service/brand/index')
const commonResult = require('./utils/commonResult')

router.get('/brand-list', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await brandService.getBrandListByPage(params)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.post('/brand', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const id = await brandService.insertBrand(params)
    commonResult.success(ctx, id)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.put('/brand', async (ctx, next) => {
  const params = ctx.request.body
  try {
    await brandService.updateBrandById(params)
    commonResult.success(ctx, params.id)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.del('/brand/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await brandService.deleteBrandById(id)
    commonResult.success(ctx)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.get('/brand-dic', async (ctx, next) => {
  try {
    const data = await brandService.queryAllBrand()
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

module.exports = router