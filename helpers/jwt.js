const jwt = require('jsonwebtoken')
// const SECRET_KEY = 'mysecret'

function generateToken(payload){
    const token = jwt.sign(payload, process.env.TOKEN_KEY)
    return token
}

function cekToken(token){
    return jwt.verify(token, process.env.TOKEN_KEY)
}

module.exports = {
    generateToken,
    cekToken
}