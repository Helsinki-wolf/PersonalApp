const router = require('express').Router()
const WeatherController = require("../controllers/weatherController.js")
const authenticate = require("../middlewares/authenticate")

router.use(authenticate)

router.get('/', WeatherController.todayWeather)

module.exports = router