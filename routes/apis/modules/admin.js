const express = require('express')
const router = express.Router()

const adminController = require('../../../controllers/apis/admin-controller')
const upload = require('../../../middleware/multer')

router.get('/restaurants', adminController.getRestaurants)
router.get('/restaurants/:id', adminController.getRestaurant)
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)
router.put('/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)

router.patch('/users/:id', adminController.patchUser)
router.get('/users', adminController.getUsers)

module.exports = router
