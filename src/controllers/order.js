const productModel = require('../models/order')
const connection = require('../configs/mysql')
const miscHelper = require('../helpers')

module.exports = {
  getAll: async (request, response) => {
    try {
      const name = request.query.name || ''
      const sortBy = request.query.sortBy || 'id'
      const orderBy = request.query.orderBy || 'asc'
      const pages = request.query.pages || '1'
      const limit = request.query.limit || '15'
      const offset = parseInt(pages)
      const startIndex = limit * (offset - 1)
      const result = await productModel.getAll(name, sortBy, orderBy, limit, startIndex)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error')
    }
  },

  getId: async (request, response) => {
    try {
      const id_product = request.params.id_product
      const result = await productModel.getId(id_product)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error')
    }
  },

  insertOrder: async (request, response) => {
    try {
      const stock = request.body.stock
      const price = request.body.price
      const pay = stock * price
      const { id_product } = request.body
      const dataOrder = {
        id_product,
        id_category: request.body.id_category,
        stock: request.body.stock,
        price: request.body.price,
        total: pay,
        created_at: new Date(),
        updated_at: new Date()
      }
      const result = await productModel.insertOrder(dataOrder)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Order failed')
    }
  }
}
