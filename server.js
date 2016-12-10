var express = require('express')
var app = express()
var config = require('./config.json')
var db = require('./db.js');

app.use(express.static('public'));

require('./app')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function() {
	console.log('Listening on port 3000!')
	db.connectDB();
	// console.log(config.mysql.host);
})