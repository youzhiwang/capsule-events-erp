const subclassModel = require('../../model/subclass/index')

const querySubclassByBrandIdAndPage = (brandId, params) => {
  return new Promise(async (resolve, reject) => {
    const limit = Number(params.pageSize)
    const offset = Number((params.pageNum - 1) * params.pageSize)
    try {
      const rows = await subclassModel.querySubclassByBrandIdAndPage(brandId, limit, offset)
      const total = await subclassModel.queryCountByBrandId(brandId)
      const data = {
        list: rows,
        total: total[0].total
      }
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}

const insertSubclass = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await subclassModel.insertSubclass(params)
      resolve(rows.insertId)
    } catch (e) {
      reject(e)
    }
  })
}

const modifySubclassById  = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await subclassModel.modifySubclassById(params)
      resolve(rows.insertId)
    } catch (e) {
      reject(e)
    }
  })
}

const deleteSubclassById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await subclassModel.deleteSubclassById(id)
      resolve(rows)
    } catch (e) {
      reject(e)
    }
  })
}

const querySubclassByBrandId = (brandId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await subclassModel.querySubclassByBrandId(brandId)
      resolve(rows)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  querySubclassByBrandIdAndPage,
  insertSubclass,
  modifySubclassById,
  deleteSubclassById,
  querySubclassByBrandId
}