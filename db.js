var mysql = require('mysql');
var config = require('./config.js');

var connection;

exports.connectDB = function() {
	connection = mysql.createConnection({
		host: config.development.database.host,
		port: config.development.database.port,
		user: config.development.database.username,
		password: config.development.database.password
	});
	connection.connect(function(err) {
		if (err) {
			console.log('Error connecting to database');
			return;
		}
		console.log('Connection established');
	});
	var sql = 'SELECT * FROM recipes.metadata';

	connection.query(sql, function (err, rows, fields) {
		if (err) throw err;
		console.log(rows[0]['colorHex']);
	})
	connection.end();
}

// var recipe = { colorHex: '', recipeName: '', recipeSource: '' };
// con.query('INSERT INTO metadata SET ?', recipe, function (err, res) {
// 	if(err) throw err;
// 	console.log('Last insert ID:', res.insertId);
// });