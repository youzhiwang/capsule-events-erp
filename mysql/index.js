const mysql = require('mysql')

const mysqlConfig = {
  host: 'localhost',
  port: '3306',
  database: 'capsule_events',
  user: 'root',
  password: 'rootroot'
}

const pool = mysql.createPool(mysqlConfig)

module.exports = pool