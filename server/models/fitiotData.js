const mongoose = require('mongoose');


const fitiotDataSchema = mongoose.Schema({
    "timestamp": { type: Date, default: new Date() },
    "temperature": Number,
    "humidity": Number,
    "alarm": Boolean
});

module.exports = mongoose.model('FitiotData', fitiotDataSchema)