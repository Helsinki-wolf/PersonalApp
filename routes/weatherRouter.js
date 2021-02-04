const router = require('express').Router()
const WeatherController = require("../controllers/weatherController.js")

router.get('/weather', WeatherController.todayWeather)

module.exports = router