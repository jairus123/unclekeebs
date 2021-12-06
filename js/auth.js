const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
    signup: async (req, res, next) => {
        const { username, password} = req.body
        
        try {
            let user = await User.findOne({ username })
            if (user) {
                req.flash('auth_error', 'Username already taken')
                return res.redirect('/login&registration')
            }

            let hash = await bcrypt.hash(password, 10)
            let user_entry = new User({username, password: hash})
            await user_entry.save()

            req.body.user = user_entry

            next()
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    },

    login: async (req, res, next) => {
        const { username, password } = req.body

        let user = await User.findOne({ username })
        if (!user) {
            req.flash('auth_error', 'Wrong username or password')
            return res.redirect('/login&registration')
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            req.flash('auth_error', 'Wrong username or password')
            return res.redirect('/login&registration')
        }

        req.body.user = user

        next()
    }
}