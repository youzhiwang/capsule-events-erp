const activityPriceModel = require('../../model/activityPrice/index')
const commodityModel = require('../../model/commodity/index')
const moment = require('moment')

const insertActivityPrice = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const commodities = await commodityModel.queryCommodityById(params.commodityId)
      const commodity = commodities[0]

      const replenishObj = {}
      replenishObj.periodCost = commodity.cost
      replenishObj.periodPrice = commodity.price
      replenishObj.discountRate = ((Number(commodity.price) - Number(params.activityPrice)) / Number(commodity.price)).toFixed(2)
      replenishObj.createTime = moment().format('YYYY-MM-DD')

      const activityPrice = Object.assign(params, replenishObj)
      const result = await activityPriceModel.insertActivityPrice(activityPrice)
      resolve(result.insertId)
    } catch (e) {
      reject(e)
    }
  })
}

const queryAllActivityPriceByCommodityId = (commodityId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await activityPriceModel.queryAllActivityPriceByCommodityId(commodityId)
      result.forEach(item => {
        item.start_time = moment(item.start_time).format('YYYY-MM-DD')
        item.end_time = moment(item.end_time).format('YYYY-MM-DD')
        item.create_time = moment(item.create_time).format('YYYY-MM-DD')
      })
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

const modifyActivityPriceById = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await activityPriceModel.modifyActivityPriceById(params)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

const deleteActivityPriceById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await activityPriceModel.deleteActivityPriceById(id)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  insertActivityPrice,
  queryAllActivityPriceByCommodityId,
  modifyActivityPriceById,
  deleteActivityPriceById
}