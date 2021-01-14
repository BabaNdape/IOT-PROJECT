const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config')
const sensorsDataRoutes = require('./routes/sensorsData');
const app = express()

// Front-end Connection
app.use(express.static('../dashboard'))

// ROUTES
app.use(bodyParser.json())
app.use('/api', sensorsDataRoutes)


// CONNECT TO DB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err != null) console.log(err)
    else console.log("Connected to MongoDB database")
});

app.listen(8080);

//TODO: AFTER all other todos maybe ? : Coap posts at least (maybe not for get)