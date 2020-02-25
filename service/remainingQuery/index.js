const remainingQueryModel = require('../../model/remainingQuery/index')
const commodityModel = require('../../model/commodity/index')
const modifyRemainingNumberLogModel = require('../../model/modifyRemainingNumberLog/index')
const usersModel = require('../../model/users/index')
const moment = require('moment')

const queryAmount = (params) => {
  return new Promise(async (resolve, reject) => {
    const limit = Number(params.pageSize)
    const offset = (Number(params.pageNum) - 1) * limit
    try {
      const listResult = await remainingQueryModel.queryAmountByPageAndConditions(params, limit, offset)
      const totalResult = await remainingQueryModel.queryCountByConditions(params)
      resolve({
        list: listResult,
        total: totalResult[0].total
      })
    } catch (e) {
      reject(e)
    }
  })
}

const modifyCommodityAmount = (params, userId) => {
  return new Promise(async (resolve, reject) => {
    const commodityId = params.commodityId
    const newRemainingNumber = params.newRemainingNumber
    const extendObj = {}
    try {
      // 查询旧的商品余量
      const oldRemainingNumberResult = await commodityModel.queryAmountById(commodityId)
      extendObj.oldRemainingNumber = oldRemainingNumberResult[0].amount
      // 获取操作用户的nick
      const nicknameResult = await usersModel.queryUserNicknameById(userId)
      extendObj.operationNickname = nicknameResult[0].nickname
      extendObj.operationUserId = userId
      // 设置操作日期
      extendObj.operationTime = moment().format('YYYY-MM-DD')
      // 修改余量
      const result = await commodityModel.modifyAmountById(newRemainingNumber, commodityId)
      // 插入余量修改日志
      await modifyRemainingNumberLogModel.insertLog(Object.assign(params, extendObj))
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  queryAmount,
  modifyCommodityAmount
}