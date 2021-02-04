const axios = require('axios');
const WEATHER_KEY = process.env.WEATHER_KEY

class WeatherController {
    static todayWeather(req.res) {
        axios.get(`http://api.weatherstack.com/current?access_key=${WEATHER_KEY}&query=Jakarta&units=m`)
            .then(response => {
                res.json(response.data)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.name)
            })
    }
}

module.exports = WeatherController