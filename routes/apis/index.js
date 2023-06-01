const express = require('express')
const router = express.Router()
const passport = require('../../config/passport') // 引入 Passport，需要他幫忙做驗證
const restController = require('../../controllers/apis/restaurant-controller')
const userController = require('../../controllers/apis/user-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')
const admin = require('./modules/admin')

router.use('/admin', admin)
router.get('/restaurants', restController.getRestaurants)
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.use('/', apiErrorHandler)

module.exports = router
