const costModel = require('../../model/cost/index')
const moment = require('moment')

const insertCost = (params) => {
  return new Promise(async (resolve, reject) => {
    params.purchasePrice = Number(params.purchasePrice).toFixed(2)
    try {
      const result = await costModel.insertCost(params)
      resolve(result.insertId)
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') reject('采购商品名子重复')
      else reject(e)
    }
  })
}

const queryCostListByPage = params => {
  return new Promise(async (resolve, reject) => {
    let {purchaseGoods, pageNum, pageSize} = params
    pageNum = Number(pageNum)
    pageSize = Number(pageSize)
    const limit = pageSize
    const offset = (pageNum - 1) * pageSize
    try {
      const listResult = await costModel.queryCostListByPage(purchaseGoods, limit, offset)
      const totalResult = await costModel.queryCountByPurchaseGoods(purchaseGoods)
      listResult.forEach(item => {
        item.purchase_price = Number(item.purchase_price).toFixed(2)
      })
      resolve({
        list: listResult,
        total: totalResult[0].total
      })
    } catch (e) {
      reject(e)
    }
  })
}

const updateCostById = params => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await costModel.updateCostById(params)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

const deleteCostById = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await costModel.deleteCostById(id)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  insertCost,
  queryCostListByPage,
  updateCostById,
  deleteCostById
}