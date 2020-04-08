const connection = require('../configs/mysql')

module.exports = {
  countData: (searchName, category) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT count(*) as totalData FROM products p LEFT JOIN category tc ON p.id_category = tc.id
        WHERE p.name LIKE '%${searchName}%' AND tc.name LIKE '%${category}%'`, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result[0].totalData)
        })
    })
  },

  getProducts: (searchName, pagination, category) => {
    return new Promise((resolve, reject) => {
    const totalData = connection.query('SELECT count (*) FROM products')
    // const totalPages = Math.ceil(totalData / limit)
    // const firstData = ((limit * activePage) - limit)

      const firstData = ((pagination.limit * pagination.activePage) - pagination.limit)

      connection.query(`SELECT p.id, p.name, p.description, p.image, p.price, p.stock, tc.name as category, p.created_at, p.updated_at FROM products p LEFT JOIN category tc ON p.id_category = tc.id
      WHERE p.name LIKE '%${searchName}%' AND tc.name LIKE '%${category}%'
      ORDER BY ${pagination.sortBy} ${pagination.orderBy}
      LIMIT ${firstData},${pagination.limit}`,
      (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  getDetail: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT products.id, products.name, products.description, products.image, products.price, products.stock, category.name as category, products.created_at, products.updated_at FROM products INNER JOIN category ON products.id_category = category.id
      WHERE products.id = ?`, productId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  insertProducts: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO products SET ?', data, (error, result) => {
      // connection.query('INSERT INTO products SET ?', data)
      // connection.query('SELECT products.id, products.name, products.description, products.image, products.price, products.stock, category.name FROM products LEFT JOIN category ON products.id_category = category.id', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateProducts: (data, productId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE products SET ? WHERE id = ?', [data, productId], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteProducts: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM products WHERE id = ?', productId, (error, result) => {
        if (error) reject(new Error(error))
          connection.query('ALTER TABLE products DROP products.id')
          connection.query('ALTER TABLE products ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
    })
  }
}
