var express = require('express')
var app = express()
var config = require('./config.json')

app.use(express.static('public'));

require('./app')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function() {
	console.log('Listening on port 3000!')
	exports.connectDB();
	// console.log(config.mysql.host);
})