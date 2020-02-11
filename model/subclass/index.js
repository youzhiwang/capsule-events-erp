const pool = require('../../mysql/index')

const querySubclassByBrandIdAndPage = (brandId, limit, offset) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM subclass WHERE `brand_id`=? LIMIT ? OFFSET ?;'
    const values = [brandId, limit, offset]
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

const queryCountByBrandId = (brandId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) as total FROM subclass WHERE `brand_id`=?;'
    const values = [brandId]
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

const insertSubclass = (subclass) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO subclass (`brand_id`, `subclass_name`, `remark`) VALUES (?, ?, ?);'
    const values = [subclass.brandId, subclass.subclassName, subclass.remark]
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

const modifySubclassById = (subclass) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE subclass SET `subclass_name`=?, `remark`=? WHERE `id`=?;'
    const values = [subclass.subclassName, subclass.remark, subclass.id]
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

const deleteSubclassById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM subclass WHERE `id`=?;'
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

const querySubclassByBrandId = (brandId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT `id`, `subclass_name` FROM subclass WHERE `brand_id`=?;'
    const values = [brandId]
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
  querySubclassByBrandIdAndPage,
  queryCountByBrandId,
  insertSubclass,
  modifySubclassById,
  deleteSubclassById,
  querySubclassByBrandId
}