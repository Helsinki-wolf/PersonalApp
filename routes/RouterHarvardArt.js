const express = require('express')

const RouterHarvardArt = express.Router()
const {ControllerHarvardArt} = require('../controllers')
const authenticate = require("../middlewares/authenticate")

RouterHarvardArt.use(authenticate)

RouterHarvardArt.get('/:page', ControllerHarvardArt.read)

module.exports={
    RouterHarvardArt
}