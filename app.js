const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const User = require('./models/User')
const Unclekeebsrecords = require('./models/Order')

const auth_check = require('./js/auth_check')
const { login, signup } = require('./js/auth')
const { jwt_sign, jwt_verify } = require('./js/jwt')


const mongoose = require('mongoose')
const mongo_uri = process.env.DB_CONNECTION

try {
    mongoose.connect(mongo_uri)
} catch (err) {
    console.error(err)
}

const db = mongoose.connection

db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to Database'))



app.use(flash())
app.use(session({
    saveUninitialized: true,
    secret: 'session_secret_key',
    resave: true
}))
app.use(cookieParser())
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

/* Routes */
app.get('/', auth_check, (req, res) => {
    res.render('index');
    console.log('viewing /');
})

app.get('/login&registration', auth_check, (req, res) => {
    res.render('login&registration', { auth_error: req.flash('auth_error') });
    console.log('viewing /loginregistration');
})

app.post('/login', login, jwt_sign, (req, res) => {
    console.log('viewing /loginregistration');
    res.redirect('/orders')
})

app.post('/register', signup, jwt_sign, (req, res) => {
    console.log('viewing /loginregistration');
    res.redirect('/orders')
})

app.get('/logout', (req, res) => {
    res.clearCookie('jwt', { path: '/' }).redirect('/')
})

app.get('/admin', jwt_verify, (req, res) => {
    res.render('admin');
    console.log('viewing /admin');
})

app.get('/orders', jwt_verify, async (req, res) => {
    const order = await Unclekeebsrecords.find()
    console.log(order)

    res.render('orders', {
        unclekeebsrecordsList: order

    })

})

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`is listening  to port ${port}`)
});