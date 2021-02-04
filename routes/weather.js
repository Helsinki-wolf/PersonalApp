
const router = require('express').Router()
const WeatherController = require("../controllers/weatherController.js")
const authenticate = require("../middlewares/authenticate")

// authenticate
router.use(authenticate)

router.get('/weather', WeatherController.todayWeather)

module.exports = router