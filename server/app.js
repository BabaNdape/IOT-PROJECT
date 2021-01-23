const express = require('express')
const mongoose = require('mongoose');
const axios = require('axios');

const coap    = require('coap')

const fitiotDataModel = require('./models/fitiotData');
const raspyDataModel = require('./models/raspyData');
require('dotenv/config')

const app = express()
const port = 3000

const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// raspy and fit server
const addressRaspy = "http://localhost:3005";
const addressFitiot = "coap://[::1]";

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

// TODO: Corriger le filtrage que Paul a cassé :(
app.get('/sensors-data-fitiot/:timeback?/', jsonParser, async (req, res) => {
  var seconds_now =  Date.now() / 1000;
  let timestampStart = (req.params.timestampStart == undefined ? seconds_now-3600 : seconds_now-req.params.timeback);
  // let timestampEnd = (req.body.timestampEnd == undefined ? seconds_now : req.body.timestampEnd);
  try {
      const query = fitiotDataModel.find();
      // query.where('timestamp').gte(timestampStart);
      // query.where('timestamp').lte(timestampEnd);
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
  fitiotData.save()
      .then(data => {
          res.json(data);
          console.log("Voici les données qui ont été postées :", fitiotData)
      })
      .catch(err => {
          console.log(err);
          res.json({ message: err });
      });
  });


// TODO: Corriger le filtrage que Paul a cassé :(
// CONNECTION WITH RASPY
// Send raspy data between two time stamp
app.get('/sensors-data-raspy/:timeback?', jsonParser, async (req, res) => {
  
  try {
    // Calculating defaults params for timestamps
    const seconds_now = Math.round(Date.now() / 1000);
    let timestampStart = (req.params.timestampStart == undefined ? seconds_now-3600 : seconds_now-req.params.timeback);
    // let timestampEnd = (req.body.timestampEnd== undefined ? seconds_now : req.body.timestampEnd);
    // console.log("timestamp start", timestampStart);
    // console.log("timestamp end", timestampEnd);

    const query = raspyDataModel.find();
    // query.where('timestamp').gte(timestampStart);
    // query.where('timestamp').lte(timestampEnd);
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

// Stop and start machine
app.post('/stop-machine', async (req,res) => {
  let path = "http://localhost:3005/stop-machine";
  data = {};
  machinFinalState = undefined
  await axios.post(path, data)
    .then((res) => {
      console.log(res.data);
      machinFinalState = res.data;
    });
  res.send(machinFinalState);
});

app.post('/start-machine', async (req,res) => {
  data = {};
  machinFinalState = undefined;
  /*await axios.post(path, data)
    .then((res) => {
      console.log(res.data);
      machinFinalState = res.data;
    });*/
  console.log('on start')
  let coapReq = coap.request(addressFitiot + '/start-machine');
  await coapReq.on('response', function(res) {
    console.log(res);
  })
  res.send(machinFinalState);
});
  
// Start server
app.listen(port, () => {
  console.log(`RIO203 project listening at http://localhost:${port}`)
})




const fitiotServer  = coap.createServer({ type: 'udp6' })

fitiotServer.on('request', function(req, res) {
  if (req.url == '/start-machine') {
    console.log('allo');
    res.end('Hello ' + req.url.split('/')[1] + '\n')
  }
  
  const payload = JSON.parse(req.payload)

  const fitiotData = new fitiotDataModel({
    "timestamp": payload.imestamp,
    "temperature": payload.temperature,
    "humidity": payload.humidity,
    "alarm": payload.alarm
  });


  fitiotData.save()
      .then(data => {
          res.end(JSON.stringify(payload))
          console.log("Voici les données qui ont été postées :", payload)
      })
      .catch(err => {
          console.log(err);
          res.end({ message: err });
      });  
})

fitiotServer.listen(function() {
  console.log('fitiotServer started')
})