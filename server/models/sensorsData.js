const mongoose = require('mongoose');

//TODO: Seperate in two different Schema : fitiotData and raspyData -- Done

const fitiotDataSchema = mongoose.Schema({
    "timestamp": { type: Date, default: Date.now },
    "description2": String,//{ type: Date, default: Date.now },
    "fitiotData": {
        "temperature": Number,
        "humidity": Number,
        "alarm": Boolean
    },
    "description": String,
});

module.exports = mongoose.model('FitiotData', fitiotDataSchema)

const raspyDataSchema = mongoose.Schema({
    "timestamp": { type: Date, default: Date.now },
    "description2": String,//{ type: Date, default: Date.now },
    "raspyData": {
        "temperatureIn": Number,
        "temperatureOut": Number,
        "pressureIn": Number,
        "pressureOut": Number,
        "humidityIn": Number,
        "humidityOut": Number
    },
    "description": String,
});

module.exports = mongoose.model('RaspyData', raspyDataSchema)