const pool = require('../../mysql/index')

const insertLog = params => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO modify_remaining_number_log VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?);'
    const values = [
      params.commodityId,
      params.commodityName,
      params.oldRemainingNumber,
      params.newRemainingNumber,
      params.reason,
      params.operationUserId,
      params.operationNickname,
      params.operationTime
    ]
    pool.getConnection((err, con) => {
      if (err) reject(err)
      else {
        con.query(sql, values, (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        })
      }
      con.release()
    })
  })
}

const queryLogByPageAndConditions = (conditions, limit, offset) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM modify_remaining_number_log WHERE `commodity_id`=?'
    const values = [conditions.commodityId]
    if (conditions.userId !== '') {
      sql += ' AND `operation_user_id`=?'
      values.push(conditions.userId)
    }
    if (conditions.reason !== '') {
      sql += ' AND `reason` LIKE ?'
      values.push(`%${conditions.reason}%`)
    }
    sql += ' ORDER BY `id` DESC LIMIT ? OFFSET ?;'
    values.push(...[limit, offset])
    pool.getConnection((err, con) => {
      if (err) reject(err)
      else {
        con.query(sql, values, (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        })
      }
      con.release()
    })
  })
}

const queryCountByConditions = (conditions) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT COUNT(*) AS total FROM modify_remaining_number_log WHERE `commodity_id`=?'
    const values = [conditions.commodityId]
    if (conditions.userId !== '') {
      sql += ' AND `operation_user_id`=?'
      values.push(conditions.userId)
    }
    if (conditions.reason !== '') {
      sql += ' AND `reason` LIKE ?'
      values.push(`%${conditions.reason}%`)
    }
    sql += ';'
    pool.getConnection((err, con) => {
      if (err) reject(err)
      else {
        con.query(sql, values, (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        })
      }
      con.release()
    })
  })
}

module.exports = {
  insertLog,
  queryLogByPageAndConditions,
  queryCountByConditions
}