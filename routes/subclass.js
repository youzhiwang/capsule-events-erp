const router = require('koa-router')()
const subclassService = require('../service/subclass/index')

router.get('/subclass-list/:brandId', async (ctx, next) => {
  const brandId = ctx.params.brandId
  const params = ctx.request.query
  try {
    const data = await subclassService.querySubclassByBrandIdAndPage(brandId, params)
    ctx.body = {
      code: 'success',
      data: data,
      message: ''
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      data: '',
      message: '获取失败'
    }
  }
})

router.post('/subclass', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const data = await subclassService.insertSubclass(params)
    ctx.body = {
      code: 'success',
      data: data,
      message: ''
    }
  } catch (e) {
    const result = {
      code: 'fail',
      data: '',
      message: e
    }
    if (e.code === 'ER_DUP_ENTRY') result.message = '子类名称重复'
    ctx.body = result
  }
})

router.put('/subclass', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const data = await subclassService.modifySubclassById(params)
    ctx.body = {
      code: 'success',
      data: data,
      message: ''
    }
  } catch (e) {
    const result = {
      code: 'fail',
      data: '',
      message: e
    }
    if (e.code === 'ER_DUP_ENTRY') result.message = '子类名称重复'
    ctx.body = result
  }
})

router.del('/subclass/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await subclassService.deleteSubclassById(id)
    ctx.body = {
      code: 'success',
      data: '',
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

router.get('/subclass-dic', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await subclassService.querySubclassByBrandId(params.brandId)
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