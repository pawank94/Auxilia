var express = require('express');
var path = require('path')
var util = require('util')
var express = require('express')
var address = require('network-address')
var updateNotifier = require('update-notifier')
var powerOff = require('power-off')
var sleepMode = require('sleep-mode')
var pkg = require('./package.json')

var app = express();
 
app.use(express.static(__dirname + '/public'));
 
app.get('/', function(req, res){
  res.render('/index.html');
});
app.post('/sleep', function (req, res) {
	console.log('here');
  sleepMode(function (err, stderr, stdout) {
    if (err) {
      util.log(err)
      res.status(500).json({ error: 'Can\'t run sleep' })
    } else {
      res.end()
    }
  });
});
app.listen(8070);
console.log("up at 8070");