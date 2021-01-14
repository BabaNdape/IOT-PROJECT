const express = require('express');
const router = express.Router();
const Test = require('../models/test');


router.get('/', (req, res) => {
    res.send('test');
});


router.post('/', (req,res) => {
    const test = new Test({
        "timestamp": req.body.timestamp,
        "raspyData": req.body.raspyData,
        "fitiotData": req.body.fitiotData
    });
    console.log(test)
    test.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json({ message: err });
        });
    });

module.exports = router;