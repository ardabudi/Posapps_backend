const express = require('express')
const Route = express.Router()
const { productUpload } = require('../controllers/upload')

const {
  getProducts, getDetail, insertProducts, updateProducts, deleteProducts
} = require('../controllers/product')

Route
  .get('/', getProducts)
  .get('/:productId', getDetail)
  // .post('/', insertProducts)
  .post('/', productUpload, insertProducts)
  // .patch('/:productId', updateProducts)
  .patch('/:productId', productUpload, updateProducts)
  .delete('/:productId', deleteProducts)

module.exports = Route
