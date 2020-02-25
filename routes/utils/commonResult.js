const success = (ctx, data = '', message = '') => {
  ctx.body = {
    code: 'success',
    data,
    message
  }
}

const fail = (ctx, message = '') => {
  ctx.body = {
    code: 'fail',
    data: '',
    message
  }
}

module.exports = {
  success,
  fail
}