const jwt = require('jsonwebtoken')

const secret_key = '12345'

module.exports = {
    jwt_sign: async (req, res, next) => {
        try {
            const { user } = req.body
            console.log(user + 'login user')
            const payload = { id: user._id }

            const token = jwt.sign(payload, secret_key)

            if (!token) return res.status(500).json({ message: 'HTTP 500 Error' })
            console.log(token + 'sign in token')
            res.cookie('jwt', token)
            next()
        } catch (err) {
            return res.status(500).json({ message: 'HTTP 500 Error' })
        }
    },

    jwt_verify: async (req, res, next) => {
        try {
            const token = req.cookies.jwt
            console.log(token + 'signed in token')
            // this prevents the user from accessing routes
            // with jwt_verify in place
            if (token === undefined) {
                return res.redirect('/')
            }

            const payload = jwt.verify(token, secret_key)
            console.log(JSON.stringify(payload))
            req.body.user = payload.id
            req.body.isAdmin = payload.isAdmin
            
            next()
        } catch (err) {
            return res.status(500).json({ message: 'HTTP 500 Error' })
        }
    }
}