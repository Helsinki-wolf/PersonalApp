const WEATHER_KEY = process.env.WEATHER_KEY
const axios = require("axios")

class WeatherController {
  static todayWeather(req, res, next) {
    axios.get(`http://api.weatherstack.com/current?access_key=${WEATHER_KEY}&query=Jakarta&units=m`)
      .then(response => {
        res.json(response.data)
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }
}

module.exports = WeatherController