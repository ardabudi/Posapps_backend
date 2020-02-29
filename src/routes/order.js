const express = require('express')
const Route = express.Router()

const orderController = require('../controllers/order')

Route
  .get('/', orderController.getAll)
  .get('/:id_product', orderController.getId)
  .post('/', orderController.insertOrder)
module.exports = Route
