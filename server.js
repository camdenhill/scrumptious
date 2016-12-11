var express = require('express')
var app = express()
var db = require('./db.js');

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

require('./app')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function() {
	console.log('Listening on port 3000!')
	db.connectDB();
	// console.log(config.mysql.host);
})