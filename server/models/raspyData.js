const mongoose = require('mongoose');

const raspyDataSchema = mongoose.Schema({
    "timestamp": { type: Date, default: Date.now },
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