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
          })
        }
        connection.release()
      })
    }
  )
}

const modifyPassword = (password, id) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE users SET `password`=? WHERE `id`=?;'
    const values = [password, id]
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
      }
      connection.release()
    })
  })
}

const modifyNickname = (nickname, id) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE users SET `nickname`=? WHERE `id`=?;'
    const values = [nickname, id]
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
      }
      connection.release()
    })
  })
}

const queryUserNicknameById = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT `nickname` FROM users WHERE `id`=?;'
    const values = [userId]
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
      }
      connection.release()
    })
  })
}

const queryAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users;'
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
      }
      connection.release()
    })
  })
}

module.exports = {
  queryUser,
  modifyPassword,
  modifyNickname,
  queryUserNicknameById,
  queryAllUsers
}