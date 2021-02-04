const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class userController{
    static register(req, res){
        const{ name, email, password} = req.body
        User.create({
            name, email, password
        })
        .then(user => {
            return res.status(201).json({id:user.id, name:user.name, email:user.email, password:user.password})
        })
        .catch(err => {
            return res.status(400).json(err)
        })
    }

    static async login(req, res){
        try{
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user){
                return res.status(401).json({
                    message: 'invalid email/password'
                })
            }
            const match = comparePassword(password, user.password)
            if(match){
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token: access_token
                })
            } else  {
                return res.status(401).json({
                    message: 'invalid email/password'
                })
            }
        }
        catch(err){
            return res.status(401).json(err)
        }
    }
}

module.exports = userController