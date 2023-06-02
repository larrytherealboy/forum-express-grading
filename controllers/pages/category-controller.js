const categoryServer = require('../../services/category-services')
const categoryController = {
  getCategories: (req, res, next) => {
    categoryServer.getCategories(req, (err, data) => { err ? next(err) : res.render('admin/categories', data) })
  },
  postCategory: (req, res, next) => {
    categoryServer.postCategory(req, (err, data) => { err ? next(err) : res.redirect('/admin/categories') })
  },
  putCategory: (req, res, next) => {
    categoryServer.putCategory(req, (err, data) => { err ? next(err) : res.redirect('/admin/categories') })
  },
  deleteCategory: (req, res, next) => {
    categoryServer.deleteCategory(req, (err, data) => { err ? next(err) : res.redirect('/admin/categories') })
  }
}
module.exports = categoryController
