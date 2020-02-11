const commodityModel = require('../../model/commodity/index')
const moment = require('moment')

const addCommodity = (params) => {
  return new Promise(async (resolve, reject) => {
    params.createTime = moment().format('YYYY-MM-DD')
    if (params.cost === '') params.cost = 0.00
    if (params.price === '') params.price = 0.00
    try {
      const rows = await commodityModel.addCommodity(params)
      resolve(rows.insertId)
    } catch (e) {
      reject(e)
    }
  })
}

const queryCommodityByConditionsAndPage = (params) => {
  return new Promise(async (resolve, reject) => {
    const limit = Number(params.pageSize)
    const offset = Number((params.pageNum - 1) * params.pageSize)
    try {
      const list = await commodityModel.queryCommodityByConditionsAndPage(params, limit, offset)
      const total = await commodityModel.queryCountByConditions(params)
      resolve({
        list,
        total: total[0].total
      })
    } catch (e) {
      reject(e)
    }
  })
}

const modifyCommodityById = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await commodityModel.modifyCommodityById(params)
      resolve(rows)
    } catch (e) {
      reject(e)
    }
  })
}

const deleteCommodityById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await commodityModel.deleteCommodityById(id)
      resolve(rows)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  addCommodity,
  queryCommodityByConditionsAndPage,
  modifyCommodityById,
  deleteCommodityById
}