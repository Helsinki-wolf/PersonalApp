const axios = require("axios")

class ZomatoController {
  static categories(req, res, next) {
    console.log("masuk");
    // let url = "https://developers.zomato.com/api/v2.1/categories"
    let zomato_key = "f47c97ddbdfbfcb3db54458050f7fed9"
    axios({
      method: "get",
      url: "https://developers.zomato.com/api/v2.1/categories",
      headers: {
        "user-key": zomato_key
      }
      
    }).then(response => {
      res.json(response.data)
    }).catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }
  static cities(req, res, next) {
    let city = req.query
    console.log(city);
    axios({
      method: "get",
      url: `https://developers.zomato.com/api/v2.1/cities?q=${city}`
    }).then(response => {
      res.status(200).json(response)
    })
  }
  static async cuisines(req, res) {
    try {
        let URL = `https://developers.zomato.com/api/v2.1/cuisines?city_id=74`
        let ZOMATO_KEY = '2cd294cc0248b7d31174330793f26d4a'
        let response = await Axios.get(URL, { headers: { 'user-key': ZOMATO_KEY } })
        console.log(response.data)
        let data = response.data.cuisines
        data = data.map(detail => { return detail.cuisine })
        return res.json({ data: data })
    } catch (err) {
        // console.log(err)
        return res.status(500).json(err)
    }
}
}

module.exports = ZomatoController