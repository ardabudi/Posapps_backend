const express = require('express')
const Route = express.Router()

const {
  authentication,
  authorization
} = require('../helpers/auth')

const {
  getCategory,
  getCatDetail,
  insertCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category')

Route
  .get('/', getCategory)
  .get('/:categoryId', getCatDetail)
  .post('/', insertCategory)
  .patch('/:categoryId', updateCategory)
  .delete('/:categoryId', deleteCategory)

module.exports = Route
