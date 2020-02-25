const modifyRemainingNumberLogModel = require('../../model/modifyRemainingNumberLog/index')

const queryLogByPageAndConditions = params => {
  return new Promise(async (resolve, reject) => {
    const limit = Number(params.pageSize)
    const offset = (Number(params.pageNum) - 1) * limit
    try {
      const listResult = await modifyRemainingNumberLogModel.queryLogByPageAndConditions(params, limit, offset)
      const totalResult = await modifyRemainingNumberLogModel.queryCountByConditions(params)
      resolve({
        list: listResult,
        total: totalResult[0].total
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  queryLogByPageAndConditions
}