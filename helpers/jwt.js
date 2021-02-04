const jwt = require("jsonwebtoken")

function generateToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_KEY)
}

module.exports = {
  generateToken
}