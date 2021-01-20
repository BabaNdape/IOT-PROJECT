const mongoose = require('mongoose');


const fitiotDataSchema = mongoose.Schema({
    "timestamp": Number,
    "temperature": Number,
    "humidity": Number,
    "alarm": Boolean
});

module.exports = mongoose.model('FitiotData', fitiotDataSchema)