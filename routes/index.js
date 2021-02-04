const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const {RouterHarvardArt} = require('./RouterHarvardArt')


router.get('/welcome', (req, res) => {
    res.send('Hallo')
})

router.use('/', authRouter)
router.use('/harvard', RouterHarvardArt)

module.exports = router