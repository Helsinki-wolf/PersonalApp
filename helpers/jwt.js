const jwt = require('jsonwebtoken')
// const SECRET_KEY = 'mysecret'

function generateToken(payload){
    const token = jwt.sign(payload, process.env.SECRET_KEY)
    return token
}

function cekToken(token){
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    generateToken,
    cekToken
}