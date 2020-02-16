const router = require('koa-router')()
const costService = require('../service/cost/index')

router.post('/cost', async (ctx, next) => {
  const params = ctx.request.body
  try {
    const data = await costService.insertCost(params)
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

router.get('/cost-list', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await costService.queryCostListByPage(params)
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

router.put('/cost', async (ctx, next) => {
  const params = ctx.request.body
  try {
    await costService.updateCostById(params)
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

router.del('/cost/:id', async (ctx, next) => {
  const id = ctx.params.id
  try {
    await costService.deleteCostById(id)
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