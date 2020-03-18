const productModel = require('../models/product')
const miscHelper = require('../helpers')

module.exports = {
  getProducts: async (request, response) => {
    try {
      const limit = request.query.limit || 100
      const activePage = request.query.page || 1
      const searchName = request.query.name || ''
      const category = request.query.category || ''
      const sortBy = request.query.sortBy || 'id' 
      // sortby
      const orderBy = request.query.orderBy || 'ASC'

      const pagination = {
        activePage, limit, sortBy, orderBy
      }

      const totalData = await productModel.countData(searchName, category)
      // console.log(totalData)
      const totalPages = Math.ceil(totalData / limit)
      // console.log(totalPages)
      const pager = {
        totalPages
      }
      const result = await productModel.getProducts(searchName, pagination, category)

      // const result = await productModel.getProducts(limit, activePage, searchName, sortBy, orderBy, category)
      // const tData = await productModel.getProducts(1000, 1, searchName, 'id', 'ASC', cat)
      // const tPage = Math.ceil(tData.length / limit)
      // console.log(tPage)

      miscHelper.response(response, 200, result, pager)
      // tPage
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
        // image: `http://localhost:8001/uploads/${request.file.filename}`,
        price: request.body.price,
        stock: request.body.stock,
        id_category: request.body.id_category,
        created_at: new Date(),
        updated_at: new Date()
      }
      const result = await productModel.insertProducts(data)
      data.id=result.insertId
      miscHelper.response(response, 200, data)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  updateProducts: async (request, response) => {
    try {
      if(!request.file){
        const productId = request.params.productId
      const data = {
        id: productId,
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        stock: request.body.stock,
        id_category: request.body.id_category,
        updated_at: new Date()
      }
      await productModel.updateProducts(data, productId)
      const result = await productModel.getDetail(productId)
      return miscHelper.response(response, 200, result[0])
      }
      const productId = request.params.productId
      const data = {
        id: productId,
        name: request.body.name,
        description: request.body.description,
        // image: `http://localhost:8001/uploads/${request.file.filename}`,
        price: request.body.price,
        stock: request.body.stock,
        id_category: request.body.id_category,
        updated_at: new Date()
      }
      await productModel.updateProducts(data, productId)
      const result = await productModel.getDetail(productId)
      miscHelper.response(response, 200, result[0])
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  deleteProducts: async (request, response) => {
    try {
      const productId = request.params.productId
      const result = await productModel.deleteProducts(productId)
      const deleteData = {
        id: parseInt(productId)
      }
      miscHelper.response(response, 200, deleteData)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}
