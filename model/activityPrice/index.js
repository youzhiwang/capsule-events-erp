const pool = require('../../mysql/index')

const insertActivityPrice = (activityPrice) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO activity_price (`commodity_id`, `activity_price`, `period_cost`, `period_price`, `discount_rate`, `start_time`, `end_time`, `activity_name`, `remark`, `create_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const values = [activityPrice.commodityId, activityPrice.activityPrice, activityPrice.periodCost, activityPrice.periodPrice, activityPrice.discountRate, activityPrice.startTime, activityPrice.endTime, activityPrice.activityName, activityPrice.remark, activityPrice.createTime]
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

const queryAllActivityPriceByCommodityId = (commodityId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM activity_price WHERE `commodity_id`=? ORDER BY `start_time` DESC;'
    const values = [commodityId]
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

const modifyActivityPriceById = (activityPrice) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE activity_price SET `activity_name`=?, `start_time`=?, `end_time`=?, `remark`=? WHERE `id`=?;'
    const values = [activityPrice.activityName, activityPrice.startTime, activityPrice.endTime, activityPrice.remark, activityPrice.id]
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

const deleteActivityPriceById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM activity_price WHERE `id`=?;'
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
  insertActivityPrice,
  queryAllActivityPriceByCommodityId,
  modifyActivityPriceById,
  deleteActivityPriceById
}