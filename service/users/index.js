const usersModel = require('../../model/users/index')

const checkUserIsExist = (params) => {
  return new Promise(async (resolve, reject) => {
    const rows = await usersModel.queryUser(params.username)
    if (rows.length === 0) reject('该用户不存在')
    else {
      if (rows[0].password === params.password) {
        delete rows[0].password
        resolve(rows[0])
      } else reject('密码错误')
    }
  })
}

module.exports = {
  checkUserIsExist
}