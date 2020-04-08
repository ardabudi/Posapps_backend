const connection = require('../configs/mysql')

module.exports = {
  getCategory: (limit, activePage, searchName, sortBy, orderBy) => {
    return new Promise((resolve, reject) => {
      const totalData = connection.query('SELECT count (*) FROM products')
      const totalPages = Math.ceil(totalData / limit)
      const firstData = ((limit * activePage) - limit)
      connection.query(`SELECT * FROM category WHERE name LIKE '%${searchName}%'
      ORDER BY ${sortBy} ${orderBy}
      LIMIT ${firstData},${limit}`,
        (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
    })
  },
  getCatDetail: (categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category WHERE id = ?', categoryId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  insertCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO category SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateCategory: (data, categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE category SET ? WHERE id=?', [data, categoryId], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteCategory: (categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM category WHERE id = ?', categoryId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
