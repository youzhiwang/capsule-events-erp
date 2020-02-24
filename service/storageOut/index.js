const moment = require('moment')
const brandModel = require('../../model/brand/index')
const subclassModel = require('../../model/subclass/index')
const commodityModel = require('../../model/commodity/index')
const usersModel = require('../../model/users/index')
const storageOutModel = require('../../model/storageOut/index')

const insertStorageOut = (params, userId) => {
  return new Promise(async (resolve, reject) => {
    // 接受的参数包括 brandId subclassId commodityId storageOutNumber remark
    // 检查 storageOutNumber 入库数量为整数
    // RegExp 判断为非负整数
    const reg = /^\d+$/
    if (!reg.test(Number(params.storageOutNumber))) {
      reject('请输入非负整数')
      return
    }
    try {
      const extendObj = {}
      // 通过 brandId 查询 brand_name
      const brandNameResult = await brandModel.queryBrandNameById(params.brandId)
      extendObj.brandName = brandNameResult[0].brand_name
      // 通过 subclassId 查询 subclass_name
      const subclassNameResult = await subclassModel.querySubclassNameById(params.subclassId)
      extendObj.subclassName = subclassNameResult[0].subclass_name
      // 通过 commodityId 查询 commodity_name
      const commodityNameResult = await commodityModel.queryCommodityNameById(params.commodityId)
      extendObj.commodityName = commodityNameResult[0].commodity_name
      // 使用 moment 创建录入时间  storageInTime
      extendObj.storageOutTime = moment().format('YYYY-MM-DD')
      // 通过 userId 获取 username
      const userNicknameResult = await usersModel.queryUserNicknameById(userId)
      extendObj.nickname = userNicknameResult[0].nickname
      extendObj.userId = userId

      const lastParams = Object.assign(params, extendObj)
      // 从 commodity 表信息中获取旧的的 amount 字段，修改新的 amount
      const amountResult = await commodityModel.queryAmountById(params.commodityId)
      let amount = amountResult[0].amount
      let newAmount = amount - Number(params.storageOutNumber)
      if (newAmount < 0) throw new Error(`销货量大于库存数量，当前最大库存数量为${amount}`)
      await commodityModel.modifyAmountById(newAmount, params.commodityId)
      // 开始入库
      const result = await storageOutModel.insertStorageOut(lastParams)
      resolve(result.insertId)
    } catch (e) {
      reject(e)
    }
  })
}

const queryStorageOutRecordByPageAndConditions = (params) => {
  return new Promise(async (resolve, reject) => {
    const limit = Number(params.pageSize)
    const offset = (Number(params.pageNum) - 1) * Number(params.pageSize)
    try {
      const listResult = await storageOutModel.queryStorageOutRecordByPageAndConditions(params, limit, offset)
      const totalResult = await storageOutModel.queryCountByPageAndConditions(params)
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
  insertStorageOut,
  queryStorageOutRecordByPageAndConditions
}