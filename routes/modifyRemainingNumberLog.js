const router = require('koa-router')()
const modifyRemainingNumberLogService = require('../service/modifyRemainingNumberLog/index')
const commonResult = require('./utils/commonResult')

// 余量变更记录列表
router.get('/modify-remaining-number-log-list', async (ctx, next) => {
  const params = ctx.request.query
  try {
    const data = await modifyRemainingNumberLogService.queryLogByPageAndConditions(params)
    commonResult.success(ctx, data)
  } catch (e) {
    commonResult.fail(ctx, e.message)
  }
})

module.exports = router