const express = require('express')
const router = express.Router()
const authRouter = require('./auth')

router.get('/welcome', (req, res) => {
    res.send('Hallo')
})

router.use('/', authRouter)

module.exports = router