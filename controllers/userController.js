const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class userController {
    static register(req, res) {
        const { name, email, password } = req.body
        User.create({
            name, email, password
        })
            .then(user => {
                return res.status(201).json({ id: user.id, name: user.name, email: user.email, password: user.password })
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(401).json({
                    message: 'invalid email/password'
                })
            }
            const match = comparePassword(password, user.password)
            if (match) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token: access_token
                })
            } else {
                return res.status(401).json({
                    message: 'invalid email/password'
                })
            }
        }
        catch (err) {
            return res.status(401).json(err)
        }
    }
    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''
        client
            .verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.CLIENT_ID,
            })
            .then((ticket) => {
                const payload = ticket.getPayload()
                email = payload.email
                console.log(payload);
                return User.findOne({ where: { email } })
            })
            .then((user) => {
                if (user) {
                    const token = generateToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({ access_token: token })
                } else {
                    return User.create({
                        email, password: process.env.USER_PWD_GOOGLE
                    })
                }
            })
            .then((registeredUser) => {
                const token = generateToken({
                    id: registeredUser.id,
                    email: registeredUser.email
                })
                res.status(201).json({ access_token: token })
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

module.exports = userController