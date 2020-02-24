const router = require('koa-router')()
const commodityService = require('../service/commodity/index')

router.post('/commodity', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const id = await commodityService.addCommodity(params)
    ctx.body = {
      code: 'success',
      data: id,
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

router.get('/commodity-list', async (ctx, next) => {
  const params = ctx.request.query
  const rows = await commodityService.queryCommodityByConditionsAndPage(params)
  ctx.body = {
    code: 'success',
    data: rows,
    message: ''
  }
})

router.put('/commodity', async (ctx, next) => {
  const params = ctx.request.body
  try {
    await commodityService.modifyCommodityById(params)
    ctx.body = {
      code: 'success',
      body: '',
      message: ''
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      body: '',
      message: e
    }
  }
})

router.del('/commodity/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await commodityService.deleteCommodityById(id)
    ctx.body = {
      code: 'success',
      body: '',
      message: ''
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      body: '',
      message: e
    }
  }
})

router.get('/commodity-dic', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await commodityService.queryAllCommodity(params)
    ctx.body = {
      code: 'success',
      data,
      message: ''
    }
  } catch (e) {
    ctx.body = {
      code: 'fail',
      body: '',
      message: e
    }
  }
})

module.exports = router