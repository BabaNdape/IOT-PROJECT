const mongoose = require('mongoose');

const SensorsDataSchema = mongoose.Schema({
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
    "fitiotData": {
        "temperature": Number,
        "humidity": Number,
        "alarm": Boolean
    },
    "description": String,
});

module.exports = mongoose.model('SensorsData', SensorsDataSchema)