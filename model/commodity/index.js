const pool = require('../../mysql/index')

const addCommodity = (commodity) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO commodity (`brand_id`, `brand_name`, `subclass_id`, `subclass_name`, `commodity_name`, `commodity_nickname`, `cost`, `price`, `size`, `remark`, `create_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const values = [commodity.brandId, commodity.brandName, commodity.subclassId, commodity.subclassName, commodity.commodityName, commodity.commodityNickname, commodity.cost, commodity.price, commodity.size, commodity.remark, commodity.createTime]
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

const queryCommodityByConditionsAndPage = (params, limit, offset) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM commodity WHERE true '
    const values = []
    if (params.brandId !== '') {
      sql += 'AND `brand_id`=? '
      values.push(params.brandId)
    }
    if (params.subclassId !== '') {
      sql += 'AND `subclass_id`=? '
      values.push(params.subclassId)
    }
    if (params.commodityName !== '') {
      sql += 'AND `commodity_name` LIKE ? '
      values.push(`%${params.commodityName}%`)
    }
    sql += 'ORDER BY `id` DESC LIMIT ? OFFSET ?;'
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

const queryCountByConditions = (params) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS total FROM commodity WHERE true `
    const values = []
    if (params.brandId !== '') {
      sql += 'AND `brand_id`=? '
      values.push(params.brandId)
    }
    if (params.subclassId !== '') {
      sql += 'AND `subclass_id`=? '
      values.push(params.subclassId)
    }
    if (params.commodityName !== '') {
      sql += 'AND `commodity_name` LIKE ? '
      values.push(`%${params.commodityName}%`)
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

const modifyCommodityById = (commodity) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE commodity SET `commodity_nickname`=?, `cost`=?, `price`=?, `size`=?, `remark`=? WHERE `id`=?;'
    const values = [commodity.commodityNickname, commodity.cost, commodity.price, commodity.size, commodity.remark, commodity.id]
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

const deleteCommodityById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM commodity WHERE id=?;'
    const values = [id]
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

const queryCommodityById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM commodity WHERE `id`=?;'
    const values = [id]
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

const queryAllCommodity = (brandId, subclassId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM commodity WHERE `brand_id`=? AND `subclass_id`=?;'
    const values = [brandId, subclassId]
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

const queryCommodityNameById = (commodityId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT `commodity_name` FROM commodity WHERE `id`=?;'
    const values = [commodityId]
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

const queryAmountById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT `amount` FROM commodity WHERE `id`=?;'
    const values = [id]
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

const modifyAmountById = (amount, id) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE commodity SET `amount`=? WHERE `id`=?;'
    const values = [amount, id]
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
  addCommodity,
  queryCommodityByConditionsAndPage,
  queryCountByConditions,
  modifyCommodityById,
  deleteCommodityById,
  queryCommodityById,
  queryAllCommodity,
  queryCommodityNameById,
  queryAmountById,
  modifyAmountById
}