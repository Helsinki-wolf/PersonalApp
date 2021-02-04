const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/googlelogin', UserController.googleLogin)

module.exports = router