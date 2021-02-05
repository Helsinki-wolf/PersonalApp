const axios = require("axios")
let zomato_key = "f47c97ddbdfbfcb3db54458050f7fed9"

class ZomatoController {
  static categories(req, res, next) {
    axios({
      method: "get",
      url: "https://developers.zomato.com/api/v2.1/categories",
      headers: {
        "user-key": zomato_key
      }
      
    }).then(response => {
      res.json(response.data)
    }).catch(err => {
      console.log(err.name);
      next(err)
    })
  }
  static cities(req, res, next) {
    axios({
      method: "get",
      url: `https://developers.zomato.com/api/v2.1/cities?q=Jakarta`,
      headers: {
        "user-key": zomato_key
      }
    }).then(response => {
      res.status(200).json(response.data)
    }).catch(err => {
      next(err)
    })
  }
  static cuisines(req, res, next) {
    axios({
      method: "get",
      url: `https://developers.zomato.com/api/v2.1/cuisines?city_id=74`,
      headers: {
        "user-key": zomato_key
      }
    }).then(response => {
      res.status(200).json(response.data)
    }).catch(err => {
      next(err)
    })
  }
  static collections(req, res, next) {
    axios({
      method: "get",
      url: `https://developers.zomato.com/api/v2.1/collections?city_id=74`,
      headers: {
        "user-key": zomato_key
      }
    }).then(response => {
      res.status(200).json(response.data)
    }).catch(err => {
      next(err)
    })
  }
  static search(req, res, next) {
    axios({
      method: "get",
      url: `https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=15&sort=rating`,
      headers: {
        "user-key": zomato_key
      }
    }).then(response => {
      res.status(200).json(response.data.restaurants)
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = ZomatoController