const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const {RouterHarvardArt} = require('./RouterHarvardArt')

const zomatoRouter = require("./zomatoRouter")

router.get('/welcome', (req, res) => {
    res.send('Hallo')
})

router.use('/', authRouter)
router.use('/harvard', RouterHarvardArt)
router.use("/foods", zomatoRouter)

module.exports = router