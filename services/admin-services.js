const { Restaurant, Category, User } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')

const adminController = {
  getUsers: (req, cb) => {
    return User.findAll({
      raw: true
    })
      .then(users => cb(null, { users }))
      .catch(err => cb(err))
  },
  patchUser: (req, cb) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        if (user.dataValues.email === 'root@example.com') throw new Error('禁止變更 root 權限')
        user.update({ isAdmin: !(user.dataValues.isAdmin) })
        console.log(user)
        return cb(null, user)
      })
      .catch(err => cb(err))
  },
  getRestaurants: (req, cb) => {
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => cb(null, { restaurants }))
      .catch(err => cb(err))
  },
  getRestaurant: (req, cb) => {
    Restaurant.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurant => {
        if (!restaurant) throw new Error("Restaurant didn't exist!") //  如果找不到，回傳錯誤訊息，後面不執行
        cb(null, { restaurant })
      })
      .catch(err => cb(err))
  },
  createRestaurant: (req, cb) => {
    return Category.findAll({
      raw: true
    })
      .then(categories => cb(null, { categories }))
      .catch(err => cb(err))
  },
  postRestaurant: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Restaurant name is required!')
    const { file } = req // 把檔案取出來，也可以寫成 const file = req.file
    imgurFileHandler(file) // 把取出的檔案傳給 file-helper 處理後
      .then(filePath => Restaurant.create({ // 產生一個新的 Restaurant 物件實例，並存入資料庫
        name,
        tel,
        address,
        openingHours,
        description,
        image: filePath || null,
        categoryId
      }))
      .then(newRestaurant => cb(null, { restaurant: newRestaurant })) // 新增完成後導回後台首頁
      .catch(err => cb(err))
  },
  editRestaurant: (req, cb) => {
    return Promise.all([
      Restaurant.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([restaurant, categories]) => {
        if (!restaurant) throw new Error("Restaurant doesn't exist!")
        cb(null, { restaurant, categories })
      })
      .catch(err => cb(err))
  },
  putRestaurant: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Restaurant name is required!')

    const { file } = req // 把檔案取出來，也可以寫成 const file = req.file
    Promise.all([
      Restaurant.findByPk(req.params.id),
      imgurFileHandler(file)]) // 把取出的檔案傳給 file-helper 處理後
      .then(([restaurant, filePath]) => {
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        return restaurant.update({
          name,
          tel,
          address,
          openingHours,
          description,
          image: filePath || restaurant.image,
          categoryId
        })
      })
      .then(updateRestaurant => {
        cb(null, updateRestaurant)
      })
      .catch(err => cb(err))
  },
  deleteRestaurant: (req, cb) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        return restaurant.destroy()
      })
      .then(deletedRestaurant => cb(null, { restaurants: deletedRestaurant }))
      .catch(err => cb(err))
  }
}

module.exports = adminController
