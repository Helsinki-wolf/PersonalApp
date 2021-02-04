const express = require('express');
const router = express.Router()

const userRouter = require('./user')
const weatherRouter = require('./weather')

router.use('/user', userRouter)
router.use('/weather', weatherRouter)

module.exports = router