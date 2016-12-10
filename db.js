var mysql = require('mysql');
var config = require('./config.js');

var connection = mysql.createConnection({
	host: config.development.database.host,
	user: config.development.database.username,
	password: config.development.database.password
});

exports.connectDB = function() {
	console.log(config.development.database.host);
	connection.connect(function(err) {
		if (err) {
			console.log('Error connecting to database');
			return;
		}
		console.log('Connection established');
	});
}

// var sql = 'SELECT * FROM recipes.ingredients';

// connection.query(sql, function (err, rows, fields) {
// 	if (err) throw err;
// 	console.log(rows[0]);
// })

connection.end();