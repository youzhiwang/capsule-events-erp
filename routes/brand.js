const router = require('koa-router')()
const brandService = require('../service/brand/index')

router.get('/brand-list', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await brandService.getBrandListByPage(params)
    ctx.body = {
      code: 'success',
      data: data,
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

router.post('/brand', async (ctx, next) => {
  const params = ctx.request.body
  try{
    const id = await brandService.insertBrand(params)
    ctx.body = {
      code: 'success',
      data: id,
      message: '新建成功'
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      data: '',
      message: e
    }
  }
})

router.put('/brand', async (ctx, next) => {
  const params = ctx.request.body
  try {
    await brandService.updateBrandById(params)
    ctx.body = {
      code: 'success',
      data: params.id,
      message: ''
    }
  } catch (e) {
    ctx.body  = {
      code: 'fail',
      data: '',
      message: e
    }
  }
})

router.del('/brand/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await brandService.deleteBrandById(id)
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

router.get('/brand-dic', async (ctx, next) => {
  try{
    const data = await brandService.queryAllBrand()
    ctx.body = {
      code: 'success',
      data,
      message: ''
    }
  }catch (e) {
    ctx.body = {
      code: 'fail',
      data: '',
      message: e
    }
  }
})

module.exports = router