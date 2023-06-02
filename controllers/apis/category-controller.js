const categoryServer = require('../../services/category-services')

const categoryController = {
  getCategories: (req, res, next) => {
    categoryServer.getCategories(req, (err, data) => { err ? next(err) : res.json({ status: 'success', data }) })
  },
  postCategory: (req, res, next) => {
    categoryServer.postCategory(req, (err, data) => { err ? next(err) : res.json({ status: 'success', data }) })
  },
  putCategory: (req, res, next) => {
    categoryServer.putCategory(req, (err, data) => { err ? next(err) : res.json({ status: 'success', data }) })
  },
  deleteCategory: (req, res, next) => {
    categoryServer.deleteCategory(req, (err, data) => { err ? next(err) : res.json({ status: 'success', data }) })
  }
}

module.exports = categoryController
