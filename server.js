'use strict';

var express = require('express')
var app = express()

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

require('./app/routes')(app);
app.set('views',__dirname + '/views/pages');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var connection;
var server = app.listen(3000, function() {
	console.log('Listening on port 3000!')
})