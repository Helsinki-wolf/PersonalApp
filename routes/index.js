const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const zomatoRouter = require("./zomatoRouter")

router.get('/welcome', (req, res) => {
    res.send('Hallo')
})

router.use('/', authRouter)
router.use("/foods", zomatoRouter)

module.exports = router