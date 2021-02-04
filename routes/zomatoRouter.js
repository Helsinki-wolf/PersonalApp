const router = require("express").Router()
const ZomatoController = require("../controllers/zomatoController")

router.get("/categories", ZomatoController.categories)
router.get("/cities", ZomatoController.cities)
router.get("/cuisines", ZomatoController.cuisines)

module.exports = router