const pool = require('../../mysql/index')

const queryUser = (username) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE `username` = ?'
    const values = [username]
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          resolve(rows)
          connection.release()
        })
      }
    })
    }
  )
}

module.exports = {
  queryUser
}