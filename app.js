const express = require('express');

const app = express();

const mongoose = require('mongoose')

const mongo_uri = 'mongodb+srv://user1:QEfLNr420nsSckW6@cluster0.niukw.mongodb.net/unclekeebs1?retryWrites=true&w=majority'

try {
    mongoose.connect(mongo_uri)
} catch (err) {
    console.error(err)
}

const db = mongoose.connection

db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.static(__dirname ));

app.get('/', (req, res)=>{
    res.sendfile('index.html')

})

app.get('/asd', (req, res)=>{
    res.send('asd')
})

app.post('/asd', (req, res)=>{
    res.send('asd')
})

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`is listening  to port ${port}`)
});