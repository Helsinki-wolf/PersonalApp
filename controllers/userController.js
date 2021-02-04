class UserController {
    static(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ""
        client
            .verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.CLIENT_ID
            })
            .then((ticket) => {
                const payload = ticket.getPayload()
                email.payload.email
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