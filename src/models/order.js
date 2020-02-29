require('dotenv').config()
const connection = require('../configs/mysql')
// const SQL = require('sql-template-strings')
const sqlInsertOrder = ('INSERT INTO order_product SET ?')
// const sqlSearch = ('SELECT * FROM order_product WHERE id_product=?', dataOrder.id_product)
const sqlSearchProduct = ('SELECT * FROM products WHERE id = ?')
const sqlUpdateProduct = ('UPDATE products SET stock = ? WHERE id = ?')

module.exports = {

  getAll: (name, sortBy, orderBy, limit, startIndex) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT op.id_product, op.id_category, op.stock, op.price, op.total, op.created_at, op.updated_at FROM order_product AS op INNER JOIN products ON products.id = order_product.id WHERE order_product.name LIKE '%${name}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${limit} OFFSET ${startIndex}`, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  getId: (id_product) => {
    return new Promise((resolve, reject) => {
      connection.query(sqlSearchProduct, id_product, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  insertOrder: (dataOrder) => {
    return new Promise((resolve, reject) => {
      connection.query(sqlSearchProduct, dataOrder.id_product, (error, result) => {
        if (result.length > 0 && result[0].stock > dataOrder.stock) {
          connection.query(sqlUpdateProduct, [result[0].stock - dataOrder.stock, result[0].id])
          connection.query(sqlInsertOrder, dataOrder, (error, result) => {
            if (error) reject(new Error(error))
            resolve(result)
          })
        } else {
          reject(new Error('Stock not amount'))
        }
      })
    })
  }
}
