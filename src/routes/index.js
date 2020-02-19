const express = require('express')
const Route = express.Router()

const productRouter = require('./product')
const categoryRouter = require('./category')
const user = require('./user')

Route
  .use('/product', productRouter)
  .use('/category', categoryRouter)
  .use('/uploads', express.static('./uploads'))
  .use('/user', user)


module.exports = Route