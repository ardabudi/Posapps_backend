const connection = require('../configs/mysql')

module.exports = {
  getProducts: (limit, activePage, searchName, sortBy) => {
    return new Promise((resolve, reject) => {
      const totalData = connection.query('SELECT count (*) FROM products')
      const totalPages = Math.ceil(totalData / limit)
      const firstData = ((limit * activePage) - limit)
      connection.query(`SELECT products.id, products.name, products.description, products.image, products.price, category.name as category, products.created_at, products.updated_at FROM products INNER JOIN category ON products.id_category = category.id
      WHERE products.name LIKE '%${searchName}%'
      ORDER BY ${sortBy}
      LIMIT ${firstData},${limit}`,
        (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
    })
  },
  getDetail: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT products.id, products.name, products.description, products.image, products.price, category.name as category, products.created_at, products.updated_at FROM products INNER JOIN category ON products.id_category = category.id
      WHERE products.id = ?`, productId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  insertProducts: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO products SET ?`, data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateProducts: (data, productId) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE products SET ? WHERE id = ?`, [data, productId], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteProducts: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query(`DELETE FROM products WHERE id = ?`, productId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}