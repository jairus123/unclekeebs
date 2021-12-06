/**
 * A middleware which checks if the user is already
 * logged in.
 * 
 * Unlike jwt_verify which is used for protected pages, 
 * this middleware can only be used for login and signup 
 * pages. This middleware will simply protect currently
 * logged-in users from accessing pages for unauthenticated
 * users.
 */

 module.exports = async (req, res, next) => {
    try {
        (req.cookies.jwt === undefined)
            ? next()
            : res.redirect('/orders')
    } catch (err) {
        return res.status(500).json({ message: 'HTTP 500 Error' })
    }
}