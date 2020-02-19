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
  .get('/', authentication, authorization, getCategory)
  .get('/:categoryId', authentication, authorization, getCatDetail)
  .post('/', authentication, authorization, insertCategory)
  .patch('/:categoryId', authentication, authorization, updateCategory)
  .delete('/:categoryId', authentication, authorization, deleteCategory)

module.exports = Route