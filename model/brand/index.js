const pool = require('../../mysql/index')

const queryBrandByPage = (start, pageSize) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM brand LIMIT ? OFFSET ?;'
    const values = [Number(pageSize), Number(start)]
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        })
      }
      connection.release()
    })
  })
}

const queryBrandCount = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS total FROM brand'
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, (err, rows) => {
          if (err)  reject(err)
          else resolve(rows)
        })
      }
      connection.release()
    })
  })
}

const insertBrand = (brandName, brandType) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO brand (`brand_name`, `brand_type`) VALUES (?, ?);'
    const values = [brandName, brandType]
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        })
      }
      connection.release()
    })
  })
}

const updateBrandById = (id, brandName, brandType) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE brand set `brand_name`=?, `brand_type`=? WHERE `id`=?;'
    const values = [brandName, brandType, id]
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        })
      }
      connection.release()
    })
  })
}

const deleteBrandById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM brand WHERE id=?;'
    const values = [id]
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        })
      }
      connection.release()
    })
  })
}

module.exports = {
  queryBrandByPage,
  queryBrandCount,
  insertBrand,
  updateBrandById,
  deleteBrandById
}