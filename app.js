const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const jwt = require('jsonwebtoken')
const jwtConfig = require('./jwtConfig/index')
const commonResult = require('./routes/utils/commonResult')

const sessionConfig = require('./session/config')

// routes
const users = require('./routes/users')
const brand = require('./routes/brand')
const subclass = require('./routes/subclass')
const commodity = require('./routes/commodity')
const activityPrice = require('./routes/activityPrice')
const cost = require('./routes/cost')
const storageIn = require('./routes/storageIn')
const storageOut = require('./routes/storageOut')
const remainingQuery = require('./routes/remainingQuery')
const modifyRemainingNumberLog = require('./routes/modifyRemainingNumberLog')

const app = new Koa()
// error handler
onerror(app)

// middlewares
app.use(bodyparser({enableTypes: ['json', 'form', 'text']}))
app.use(json())
app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))

app.keys = ['capsule events']

app.use(session(sessionConfig, app))

app.use(async (ctx, next) => {
  // 判断登录的设备是否为移动端
  // 如果 device 为 mobile 则走 jwt
  // 如果 device 不是 mobile 则走 session
  const device = ctx.request.headers.device
  switch (device) {
    // jwt
    case 'mobile':
      if (ctx.path !== '/login') {
        const token = ctx.request.headers.token
        await jwt.verify(token, jwtConfig.secret, async (err, decode) => {
          if (err) commonResult.fail(ctx, err.message)
          else {
            await next()
          }
        })
      } else await next()
      break
    // session
    default:
      if (ctx.path === '/login' || ctx.path === '/logout') await next()
      else {
        // 如果已经登录
        if (ctx.session.loginStatus) await next()
        else commonResult.fail(ctx, '未登录，请先登录')
      }
      break
  }
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(brand.routes(), brand.allowedMethods())
app.use(subclass.routes(), subclass.allowedMethods())
app.use(commodity.routes(), commodity.allowedMethods())
app.use(activityPrice.routes(), activityPrice.allowedMethods())
app.use(cost.routes(), cost.allowedMethods())
app.use(storageIn.routes(), storageIn.allowedMethods())
app.use(storageOut.routes(), storageOut.allowedMethods())
app.use(remainingQuery.routes(), remainingQuery.allowedMethods())
app.use(modifyRemainingNumberLog.routes(), modifyRemainingNumberLog.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
