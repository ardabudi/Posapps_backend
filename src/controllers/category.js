const categoryModel = require('../models/category')
const miscHelper = require('../helpers')

module.exports = {
  getCategory: async (request, response) => {
    try {
      const limit = request.query.limit || 10
      const activePage = request.query.page || 1
      const searchName = request.query.name || ''
      const sortBy = request.query.sortBy || 'id'
      const orderBy = request.query.orderBy || 'ASC'
      const result = await categoryModel.getCategory(limit, activePage, searchName, sortBy, orderBy)
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
      // const categoryId = request.params.categoryId
      const data = {
        // id,
        name: request.body.name,
        created_at: new Date(),
        updated_at: new Date()
      }
      const result = await categoryModel.insertCategory(data)
      data.id=result.insertId
      miscHelper.response(response, 200, data)
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
      const newData = await categoryModel.getCatDetail(categoryId)
      miscHelper.response(response, 200, newData[0])
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
