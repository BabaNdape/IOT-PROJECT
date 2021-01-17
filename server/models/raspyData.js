const mongoose = require('mongoose');

const raspyDataSchema = mongoose.Schema({
    "timestamp": { type: Date, default: Date.now },
    "temperatureIn": Number,
    "temperatureOut": Number,
    "pressureIn": Number,
    "pressureOut": Number,
    "humidityIn": Number,
    "humidityOut": Number
});

module.exports = mongoose.model('RaspyData', raspyDataSchema)