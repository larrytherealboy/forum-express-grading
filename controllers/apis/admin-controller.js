const adminServices = require('../../services/admin-services')

const adminController = {
  getUsers: (req, res, next) => {
    adminServices.getUsers(req, (err, user) => { err ? next(err) : res.json({ status: 'success', user }) })
  },
  patchUser: (req, res, next) => {
    adminServices.patchUser(req, (err, user) => {
      const userData = user.toJSON()
      delete userData.password
      if (err) next(err)
      res.json({ status: 'success', user: userData })
    })
  },
  getRestaurants: (req, res, next) => {
    adminServices.getRestaurants(req, (err, data) => { err ? next(err) : res.json({ status: 'success', data }) })
  },
  getRestaurant: (req, res, next) => {
    adminServices.getRestaurant(req, (err, data) => { err ? next(err) : res.json({ status: 'success', data }) })
  },
  postRestaurant: (req, res, next) => {
    adminServices.postRestaurant(req, (err, data) => { err ? next(err) : res.json({ status: 'success', data }) })
  },
  putRestaurant: (req, res, next) => {
    adminServices.putRestaurant(req, (err, data) => { err ? next(err) : res.json({ status: 'success', data }) })
  },
  deleteRestaurant: (req, res, next) => {
    adminServices.deleteRestaurant(req, (err, data) => { err ? next(err) : res.json({ status: 'success', data }) })
  }
}

module.exports = adminController
