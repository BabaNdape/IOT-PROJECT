const coap  = require('coap')
    , req   = coap.request('coap://[::1]/')
var payload = {
  "timestamp": 3,
  "temperature": 2,
  "humidity": 1,
  "alarm": false
}

req.write(JSON.stringify(payload));

req.on('response', function(res) {
  res.pipe(process.stdout)
})

req.end()