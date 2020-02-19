const express = require('express')
const Route = express.Router()

const {
  authentication,
  authorization
} = require('../helpers/auth')

const {
  uploads
} = require('../helpers/index')
const {
  getProducts,
  getDetail,
  insertProducts,
  updateProducts,
  deleteProducts
} = require('../controllers/product')

Route
  .get('/', authentication, authorization, getProducts)
  .get('/detail/:productId', authentication, authorization, getDetail)
  .post('/insert', uploads, authentication, authorization, insertProducts)
  .patch('/update/:productId', authentication, authorization, updateProducts)
  .delete('/delete/:productId', authentication, authorization, deleteProducts)

module.exports = Route