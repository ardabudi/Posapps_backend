const categoryModel = require('../models/category')
const miscHelper = require('../helpers')

module.exports = {
  getCategory: async (request, response) => {
    try {
      const searchName = request.query.name || ''
      const result = await categoryModel.getCategory(searchName)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  getCatDetail: async (request, response) => {
    try {
      const categoryId = request.params.categoryId
      const result = await categoryModel.getCatDetail(categoryId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  insertCategory: async (request, response) => {
    try {
      const data = {
        name: request.body.name,
        created_at: new Date(),
        updated_at: new Date()
      }
      const result = await categoryModel.insertCategory(data)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  updateCategory: async (request, response) => {
    try {
      const data = {
        name: request.body.name,
        updated_at: new Date()
      }
      const categoryId = request.params.categoryId
      const result = await categoryModel.updateCategory(data, categoryId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const categoryId = request.params.categoryId
      const result = await categoryModel.deleteCategory(categoryId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}