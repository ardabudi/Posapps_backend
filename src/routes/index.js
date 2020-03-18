const express = require('express')
const Route = express.Router()

const productRouter = require('./product')
const categoryRouter = require('./category')
const user = require('./user')
// const orderRoute = require('./order')
const purchaseRouter = require('./purchase')

Route
  .use('/product', productRouter)
  .use('/category', categoryRouter)
  .use('/uploads', express.static('./uploads'))
  .use('/user', user)
  .use('/purchase', purchaseRouter)
  // .use('/order', orderRoute)

module.exports = Route
