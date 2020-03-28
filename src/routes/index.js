const express = require('express')
const Route = express.Router()
const productRouter = require('./product')
const categoryRouter = require('./category')
const user = require('./user')
const purchaseRouter = require('./purchase')
const lastweek = require('./lastweek')

Route
  .use('/product', productRouter)
  .use('/category', categoryRouter)
  .use('/uploads', express.static('./uploads'))
  .use('/user', user)
  .use('/purchase', purchaseRouter)
  .use('/lastweek', lastweek)

module.exports = Route
