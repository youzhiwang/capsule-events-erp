const pool = require('../../mysql/index')

const insertStorageOut = (params) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO storage_out VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const values = [
      params.brandId,
      params.brandName,
      params.subclassId,
      params.subclassName,
      params.commodityId,
      params.commodityName,
      params.storageOutNumber,
      params.storageOutTime,
      params.userId,
      params.nickname,
      params.remark
    ]
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

const queryStorageOutRecordByPageAndConditions = (conditions, limit, offset) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM storage_out WHERE true'
    let values = []
    if (conditions.brandId !== '') {
      sql += ' AND `brand_id`=?'
      values.push(conditions.brandId)
    }
    if (conditions.subclassId !== '') {
      sql += ' AND `subclass_id`=?'
      values.push(conditions.subclassId)
    }
    if (conditions.commodityId !== '') {
      sql += ' AND `commodity_id`=?'
      values.push(conditions.commodityId)
    }
    if (conditions.userId !== '') {
      sql += ' AND `operation_user_id`=?'
      values.push(conditions.userId)
    }
    if (conditions.storageOutTime !== '') {
      sql += ' AND `storage_out_time`=?'
      values.push(conditions.storageOutTime)
    }
    sql += ' ORDER BY `id` DESC LIMIT ? OFFSET ?;'
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

const queryCountByPageAndConditions = (conditions) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT COUNT(*) as total FROM storage_out WHERE true'
    let values = []
    if (conditions.brandId !== '') {
      sql += ' AND `brand_id`=?'
      values.push(conditions.brandId)
    }
    if (conditions.subclassId !== '') {
      sql += ' AND `subclass_id`=?'
      values.push(conditions.subclassId)
    }
    if (conditions.commodityId !== '') {
      sql += ' AND `commodity_id`=?'
      values.push(conditions.commodityId)
    }
    if (conditions.userId !== '') {
      sql += ' AND `operation_user_id`=?'
      values.push(conditions.userId)
    }
    if (conditions.storageOutTime !== '') {
      sql += ' AND `storage_out_time`=?'
      values.push(conditions.storageOutTime)
    }
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
  insertStorageOut,
  queryStorageOutRecordByPageAndConditions,
  queryCountByPageAndConditions
}