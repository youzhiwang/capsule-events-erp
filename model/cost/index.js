const pool = require('../../mysql/index')

const insertCost = (cost) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO cost VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?);'
    const values = [cost.purchaseGoods, cost.purchasePrice, cost.unit, cost.purchaseTime, cost.contactPerson, cost.contactPhone, cost.contactAddress, cost.remark]
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

const queryCostListByPage = (purchaseGoods, limit, offset) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM cost WHERE true'
    let values = []
    if (purchaseGoods !== '') {
      sql += ' AND `purchase_goods` LIKE ?'
      values.push(`%${purchaseGoods}%`)
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

const queryCountByPurchaseGoods = purchaseGoods => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT COUNT(*) AS total FROM cost WHERE true'
    let values = []
    if (purchaseGoods !== '') {
      sql += ' AND `purchase_goods` LIKE ?'
      values.push(`%${purchaseGoods}%`)
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

const updateCostById = cost => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE cost SET `purchase_price`=?, `unit`=?, `purchase_time`=?, `contact_person`=?, `contact_phone`=?, `contact_address`=?, `remark`=? WHERE id=?;'
    const values = [cost.purchasePrice, cost.unit, cost.purchaseTime, cost.contactPerson, cost.contactPhone, cost.contactAddress, cost.remark, cost.id]
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

const deleteCostById = id => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM cost WHERE id=?;'
    const values = [id]
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
  insertCost,
  queryCostListByPage,
  queryCountByPurchaseGoods,
  updateCostById,
  deleteCostById
}