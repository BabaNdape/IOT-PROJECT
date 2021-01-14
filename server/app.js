const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config')
const testRoutes = require('./routes/test');
const app = express()


// ROUTES
app.use(bodyParser.json())
app.use('/routes', testRoutes)
app.get('/', (req, res) => {
    res.send('Hello world');
});


// CONNECT TO DB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err != null) console.log(err)
    console.log("Connected to MongoDB database")
});


app.listen(8080);
