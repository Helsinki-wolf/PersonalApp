const express = require('express')

const RouterHarvardArt = express.Router()
const {ControllerHarvardArt} = require('../controllers')

RouterHarvardArt.get('/:page', ControllerHarvardArt.read)

module.exports={
    RouterHarvardArt
}