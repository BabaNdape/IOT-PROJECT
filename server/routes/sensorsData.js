const express = require('express');
const router = express.Router();
const SensorsData = require('../models/sensorsData');

// GET SENSOR DATA

//TODO: Implement the feature that enable the collection of data of the last x minutess
//TODO: once posts and databases are seperated, the job of this function will be to regroup the two
router.get('/sensorsData', async (req, res) => {
    try {
        const sensorsData = await SensorsData.find();
        res.json(sensorsData);
    } catch(err) {
        res.json({ message: err });
    }
});

// SUBMIT SENSOR DATA
//TODO: Seperate in two different posts : fitiotData and raspyData
router.post('/sensorsData', (req,res) => {
    const sensorsData = new SensorsData({
        "timestamp": req.body.timestamp,
        "raspyData": req.body.raspyData,
        "fitiotData": req.body.fitiotData
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

module.exports = router;