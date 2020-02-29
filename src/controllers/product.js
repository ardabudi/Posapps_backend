const productModel = require('../models/product')
const miscHelper = require('../helpers')
// const { port } require('../configs')

module.exports = {
  getProducts: async (request, response) => {
    try {
      const limit = request.query.limit || 100
      const activePage = request.query.page || 1
      const searchName = request.query.name || ''
      const cat = request.query.category || ''
      const sortBy = request.query.sortby || 'id'
      const orderBy = request.query.orderBy || 'ASC'
      const result = await productModel.getProducts(limit, activePage, searchName, sortBy, orderBy, cat)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  getDetail: async (request, response) => {
    try {
      const productId = request.params.productId
      const result = await productModel.getDetail(productId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  insertProducts: async (request, response) => {
    try {
      console.log(request.file)
      const data = {
        name: request.body.name,
        description: request.body.description,
        image: `http://localhost:8001/uploads/${request.file.filename}`,
        price: request.body.price,
        stock: request.body.stock,
        id_category: request.body.id_category,
        created_at: new Date(),
        updated_at: new Date()
      }
      const result = await productModel.insertProducts(data)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  updateProducts: async (request, response) => {
    try {
      const productId = request.params.productId
      const data = {
        name: request.body.name,
        description: request.body.description,
        image: `http://localhost:8001/uploads/${request.file.filename}`,
        price: request.body.price,
        stock: request.body.stock,
        id_category: request.body.id_category,
        updated_at: new Date()
      }
      const result = await productModel.updateProducts(data, productId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  deleteProducts: async (request, response) => {
    try {
      const productId = request.params.productId
      const result = await productModel.deleteProducts(productId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}
