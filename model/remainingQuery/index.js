const pool = require('../../mysql/index')

const queryAmountByPageAndConditions = (params, limit, offset) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM commodity WHERE true AND `brand_id`=?'
    const values = [params.brandId]
    if (params.subclassId !== '') {
      sql += ' AND `subclass_id`=?'
      values.push(params.subclassId)
    }
    if (params.commodityId !== '') {
      sql += ' AND `id`=?'
      values.push(params.commodityId)
    }
    sql += ' ORDER BY `id` LIMIT ? OFFSET ?;'
    values.push(...[limit, offset])
    pool.getConnection((err, con) => {
      if (err) reject(err)
      else {
        con.query(sql, values, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      }
      con.release()
    })
  })
}

const queryCountByConditions = (conditions) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT COUNT(*) AS total FROM commodity WHERE true AND `brand_id`=?'
    const values = [conditions.brandId]
    if (conditions.subclassId !== '') {
      sql += ' AND `subclass_id`=?'
      values.push(conditions.subclassId)
    }
    if (conditions.commodityId !== '') {
      sql += ' AND `id`=?'
      values.push(conditions.commodityId)
    }
    sql += ';'
    pool.getConnection((err, con) => {
      if (err) reject(err)
      else {
        con.query(sql, values, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      }
      con.release()
    })
  })
}

module.exports = {
  queryAmountByPageAndConditions,
  queryCountByConditions
}