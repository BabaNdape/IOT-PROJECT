const express = require('express')
const mongoose = require('mongoose');

const fitiotDataModel = require('./models/fitiotData');
const raspyDataModel = require('./models/raspyData');
require('dotenv/config')

const app = express()
const port = 3000

const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()



// CONNECT DASHBOARD
app.use(express.static('../dashboard'))


// CONNECT TO DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err != null) console.log(err)
  else console.log("Connected to MongoDB database")
});



// ROUTES

// CONNECTION WITH FIT-IOT
// Send fit iot data between two time stamp
app.get('/sensors-data-fitiot', jsonParser, async (req, res) => {
  let timestampStart = (req.body.timestampStart == undefined ? "1900-01-01T23:15:11.258Z" : req.body.timestampStart);
  let timestampEnd = (req.body.timestampEnd== undefined ? new Date() : req.body.timestampEnd);
  try {
      const query = fitiotDataModel.find();
      query.where('timestamp').gte(timestampStart);
      query.where('timestamp').lte(timestampEnd);
      let fitiotDataReturned = {};
      fitiotDataReturned = [];

      query.exec(async (err, fitData) => {
        if (err) { throw err; }
        // On va parcourir le résultat et les ajouter dans le JSON retourné
        var curFitData;
        for (var i = 0, l = fitData.length; i < l; i++) {
          curFitData = {
            timestamp:  fitData[i].timestamp,
            temperature: fitData[i].temperature,
            humidity: fitData[i].humidity,
            alarm: fitData[i].alarm
          };
          
          fitiotDataReturned.push(curFitData);
        }
        res.json(fitiotDataReturned);
      });
  } catch(err) {
      res.json({ message: err });
  }
});

// Receive data from fitiot
app.post('/sensors-data-fitiot', jsonParser, async (req,res) => {
  console.log(req.body.timestamp);
  const fitiotData = new fitiotDataModel({
      "timestamp": req.body.timestamp,
      "temperature": req.body.temperature,
      "humidity": req.body.humidity,
      "alarm": req.body.alarm
  });
  console.log("Voici les données qui ontété postées :", fitiotData)
  fitiotData.save()
      .then(data => {
          res.json(data);
      })
      .catch(err => {
          console.log(err);
          res.json({ message: err });
      });
  });


// CONNECTION WITH FIT-IOT
// Send raspy data between two time stamp
app.get('/sensors-data-raspy', jsonParser, async (req, res) => {
  let timestampStart = (req.body.timestampStart == undefined ? "1900-01-01T23:15:11.258Z" : req.body.timestampStart);
  let timestampEnd = (req.body.timestampEnd== undefined ? new Date() : req.body.timestampEnd);
  console.log("timestamp start", timestampStart);
  console.log("timestamp end", timestampEnd);
  try {
      const query = raspyDataModel.find();
      query.where('timestamp').gte(timestampStart);
      query.where('timestamp').lte(timestampEnd);
      let raspyDataReturned = {};
      raspyDataReturned = [];

      query.exec(async (err, raspDataResult) => {
        if (err) { throw err; }
        // On va parcourir le résultat et les ajouter dans le JSON retourné
        var curRaspyData;
        for (var i = 0, l = raspDataResult.length; i < l; i++) {
          curRaspyData = {
            timestamp: raspDataResult[i].timestamp,
            temperatureIn: raspDataResult[i].temperatureIn,
            temperatureOut: raspDataResult[i].temperatureOut,
            pressureIn: raspDataResult[i].pressureIn,
            pressureOut: raspDataResult[i].pressureOut,
            humidityIn: raspDataResult[i].humidityIn,
            humidityOut: raspDataResult[i].humidityOut,
          };
          
          raspyDataReturned.push(curRaspyData);
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
  const raspyData = new raspyDataModel({
      "timestamp": req.body.timestamp,
      "temperatureIn": req.body.temperatureIn,
      "temperatureOut": req.body.temperatureOut,
      "pressureIn": req.body.pressureIn,
      "pressureOut": req.body.pressureOut,
      "humidityIn": req.body.humidityIn,
      "humidityOut": req.body.humidityOut,
  });
  console.log("Voici les données qui ontété postées :", raspyData)
  raspyData.save()
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
  console.log(`RIO203 project listening at http://localhost:${port}`)
})

