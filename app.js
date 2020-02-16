const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const users = require('./routes/users')
const brand = require('./routes/brand')
const subclass = require('./routes/subclass')
const commodity = require('./routes/commodity')
const activityPrice = require('./routes/activityPrice')
const cost = require('./routes/cost')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({enableTypes: ['json', 'form', 'text']}))
app.use(json())
app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))


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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
