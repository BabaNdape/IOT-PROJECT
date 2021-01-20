const mongoose = require('mongoose');

const raspyDataSchema = mongoose.Schema({
    "timestamp": Number,
    "temperatureIn": Number,
    "temperatureOut": Number,
    "pressureIn": Number,
    "pressureOut": Number,
    "humidityIn": Number,
    "humidityOut": Number
});

module.exports = mongoose.model('RaspyData', raspyDataSchema)