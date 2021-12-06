const mongoose = require('mongoose')

const unclekeebsrecordsSchema = new mongoose.Schema({
     

    timestamp: String,
    mechkeyboard: String,
    switchLubing: String,
    stabModding: String,
    caseMod: String,
    switchFilm: String,
    soldering: String,
    desoldering: String,
    millmaxConversion: String,
    mechkeebsAssembly: String,
    wiredtoDetachable: String,
    name: String,
    contactNum: String,
    fbLink: String,
    email: String,
    shippingAddress: String,
    paymentMethod: String,
    shippingMethod: String,
    instruction: String


})


module.exports = mongoose.model('Unclekeebsrecord', unclekeebsrecordsSchema)