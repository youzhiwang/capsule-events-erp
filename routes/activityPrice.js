const router = require('koa-router')()
const activityPriceService = require('../service/activityPrice/index')

router.post('/activity-price', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const id = await activityPriceService.insertActivityPrice(params)
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

router.get('/activity-price-list-all', async (ctx, next) => {
  const params = ctx.request.query
  const commodityId = params.commodityId
  try {
    const data = await activityPriceService.queryAllActivityPriceByCommodityId(commodityId)
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

router.put('/activity-price', async (ctx, next) => {
  const params = ctx.request.body
  try {
    await activityPriceService.modifyActivityPriceById(params)
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

router.del('/activity-price/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await activityPriceService.deleteActivityPriceById(id)
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

module.exports = router