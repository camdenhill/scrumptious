var mysql = require('mysql');
var config = require('./config.js');

var connection;

exports.insertRecipe = function(colorHex, recipeName, recipeSource) {
	connection = mysql.createConnection({
		host: config.development.database.host,
		port: config.development.database.port,
		user: config.development.database.username,
		password: config.development.database.password,
		database: config.development.database.db
	});
	connection.connect(function(err) {
		if (err) {
			console.log('Error connecting to database');
			return;
		}
		console.log('Connection established');
	});

	// connection.query(sql, function (err, rows, fields) {
	// 	if (err) throw err;
	// 	console.log(rows[0]['colorHex']);
	// })
	var recipe = { colorHex: colorHex, recipeName: recipeName, recipeSource: recipeSource };
	connection.query('INSERT INTO metadata SET ?', recipe, function (err, res) {
		if (err) throw err;
		// console.log('Last insert ID:', res.insertId);
		console.log('Successful');
	});
	connection.end();
}