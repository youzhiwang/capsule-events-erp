const brandModel = require('../../model/brand/index')

const getBrandListByPage = (params) => {
  const pageNum = params.pageNum
  const pageSize = params.pageSize
  const start = (pageNum - 1) * pageSize
  return new Promise(async (resolve, reject) => {
    try{
      const rows1 = await brandModel.queryBrandByPage(start, pageSize)
      const rows2  = await brandModel.queryBrandCount()
      resolve({
        list: rows1,
        total: rows2[0].total
      })
    } catch (e) {
      reject(e)
    }
  })
}

const insertBrand = (params) => {
  return new Promise(async (resolve, reject) => {
    try{
      const rows = await brandModel.insertBrand(params.brandName, params.brandType)
      resolve(rows.insertId)
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') reject('品牌名称重复')
      else reject(e)
    }
  })
}

const updateBrandById = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await brandModel.updateBrandById(params.id, params.brandName, params.brandType)
      resolve(rows)
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') reject('品牌名称重复')
      else reject(e)
    }
  })
}

const deleteBrandById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await brandModel.deleteBrandById(id)
      resolve(rows)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  getBrandListByPage,
  insertBrand,
  updateBrandById,
  deleteBrandById
}