const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const fitiotDataModel = require('./models/fitiotData');
const raspyDataModel = require('./models/raspyData');
require('dotenv/config')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// CONNECT TO DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err != null) console.log(err)
  else console.log("Connected to MongoDB database")
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Send fit iot data between two time stamp
app.get('/sensors-data-fitiot', jsonParser, async (req, res) => {
  let timestampStart = (req.body.timestampStart == undefined ? "1900-01-01T23:15:11.258Z" : req.body.timestampStart);
  let timestampEnd = (req.body.timestampEnd== undefined ? new Date() : req.body.timestampEnd);
  try {
      const query = fitiotDataModel.find();
      query.where('timestamp').gte(timestampStart);
      query.where('timestamp').lte(timestampEnd);
      let fitiotDataReturned = {};
      let key = "fitiotData";
      fitiotDataReturned[key] = [];

      query.exec(async (err, fitData) => {
        if (err) { throw err; }
        // On va parcourir le résultat et les ajouter dans le JSON retourné
        var curFitData;
        for (var i = 0, l = fitData.length; i < l; i++) {
          curFitData = {
            timestamp:  fitData[i].timestamp,
            fitiotData: fitData[i].fitiotData,
            description: fitData[i].description
          };
          
          fitiotDataReturned[key].push(curFitData);
        }
        res.json(fitiotDataReturned);
      });
  } catch(err) {
      res.json({ message: err });
  }
});


// Send raspy data between two time stamp
app.get('/sensors-data-raspy', jsonParser, async (req, res) => {
  let timestampStart = (req.body.timestampStart == undefined ? "1900-01-01T23:15:11.258Z" : req.body.timestampStart);
  let timestampEnd = (req.body.timestampEnd== undefined ? new Date() : req.body.timestampEnd);
  console.log(timestampStart);
  console.log(timestampEnd);
  try {
      const query = raspyDataModel.find();
      query.where('timestamp').gte(timestampStart);
      query.where('timestamp').lte(timestampEnd);
      let raspyDataReturned = {};
      let key = "raspyData";
      raspyDataReturned[key] = [];

      query.exec(async (err, raspDataResult) => {
        if (err) { throw err; }
        // On va parcourir le résultat et les ajouter dans le JSON retourné
        var curRaspyData;
        for (var i = 0, l = raspDataResult.length; i < l; i++) {
          curRaspyData = {
            timestamp:  raspDataResult[i].timestamp,
            raspyData: raspDataResult[i].raspyData,
            description: raspDataResult[i].description
          };
          
          raspyDataReturned[key].push(curRaspyData);
        }
        res.json(raspyDataReturned);
      });
  } catch(err) {
      res.json({ message: err });
  }
});

// Receive data from raspy
app.post('/sensors-data-raspy', jsonParser, async (req,res) => {
  console.log(req.body);
  const sensorsData = new raspyDataModel({
      "timestamp": req.body.timestamp,
      "raspyData": req.body.raspyData,
      "description": req.body.description
  });
  console.log(sensorsData)
  sensorsData.save()
      .then(data => {
          res.json(data);
      })
      .catch(err => {
          console.log(err);
          res.json({ message: err });
      });
  });
  // Receive data from fitiot
  app.post('/sensors-data-fitiot', jsonParser, async (req,res) => {
    console.log(req.body.timestamp);
    const sensorsData = new fitiotDataModel({
        "timestamp": req.body.timestamp,
        "fitiotData": req.body.fitiotData,
        "description": req.body.description
    });
    console.log(sensorsData.timestamp)
    sensorsData.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json({ message: err });
        });
    });

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

