var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
var path = require('path');

var options = {
    key  : fs.readFileSync('key.pem'),
    cert : fs.readFileSync('cert.pem')
};

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

https.createServer(options, app).listen(3443, function () {
    console.log('Started!');
});