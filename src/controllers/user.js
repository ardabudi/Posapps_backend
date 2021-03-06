const userModel = require('../models/user')
const helper = require('../helpers')
const JWT = require('jsonwebtoken')
const { JWT_KEY } = require('../configs')

module.exports = {
  users: async (req, res) => {
    try {
      const result = await userModel.getUsers()
      // response.json(result)
      helper.response(res, 200, result)
    } catch (error) {
      helper.customErrorResponse(res, 404, 'Failed')
    }
  },
  register: async (request, response) => {
    try {
      const salt = helper.generateSalt(18)
      const hashPassword = helper.setPassword(request.body.password, salt)
      const data = {
        name: request.body.name,
        email: request.body.email,
        salt: hashPassword.salt,
        password: hashPassword.passwordHash,
        status: request.body.status,
        created_at: new Date(),
        updated_at: new Date()
      }
      const result = await userModel.register(data)
      // data.userId = result.insertId
      // response.json(data)
      helper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      helper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  login: async (request, response) => {
    const data = {
      password: request.body.password,
      email: request.body.email
    }

    const emailValid = await userModel.checkEmail(data.email)
    const dataUser = emailValid[0]
    const hashPassword = helper.setPassword(data.password, dataUser.salt)

    if (hashPassword.passwordHash === dataUser.password) {
      const token = JWT.sign({
        email: dataUser.email,
        id: dataUser.id
      }, JWT_KEY, {
          expiresIn: '2h'
        })

      delete dataUser.salt
      delete dataUser.password

      dataUser.token = token

      helper.response(response, 200, dataUser)
    } else {
      response.json({
        message: 'Login error!'
      })
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId
      const result = await userModel.deleteUser(userId)
      helper.response(res, 200, userId)
    } catch (error) {
      console.log(error)
      helper.customErrorResponse(res, 404, 'Server error!')
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId
      const data = {
        name: req.body.name,
        status: req.body.status,
        email: req.body.email
      }
      await userModel.updateUser(data, userId)
      const result = await userModel.getDetail(userId)
      helper.response(res, 200, result[0])
    } catch (error) {
      console.log(error)
      helper.customErrorResponse(res, 500, 'Server error!')
    }
  }
}
