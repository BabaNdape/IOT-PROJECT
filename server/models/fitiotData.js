const mongoose = require('mongoose');


const fitiotDataSchema = mongoose.Schema({
    "timestamp": { type: Date, default: new Date() },
    "fitiotData": {
        "temperature": Number,
        "humidity": Number,
        "alarm": Boolean
    },
    "description": String,
});

module.exports = mongoose.model('FitiotData', fitiotDataSchema)