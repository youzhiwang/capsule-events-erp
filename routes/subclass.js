const router = require('koa-router')()
const subclassService = require('../service/subclass/index')
const commonResult = require('./utils/commonResult')

router.get('/subclass-list/:brandId', async (ctx, next) => {
  const brandId = ctx.params.brandId
  const params = ctx.request.query
  try {
    const data = await subclassService.querySubclassByBrandIdAndPage(brandId, params)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.post('/subclass', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const data = await subclassService.insertSubclass(params)
    commonResult.success(ctx, data)
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') e = '子类名称重复'
    commonResult.fail(ctx, e)
  }
})

router.put('/subclass', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const data = await subclassService.modifySubclassById(params)
    commonResult.success(ctx, data)
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') e = '子类名称重复'
    commonResult.fail(ctx, e)
  }
})

router.del('/subclass/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await subclassService.deleteSubclassById(id)
    commonResult.success(ctx)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

router.get('/subclass-dic', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await subclassService.querySubclassByBrandId(params.brandId)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e)
  }
})

module.exports = router