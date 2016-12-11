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

	var recipe = { colorHex: colorHex, recipeName: recipeName, recipeSource: recipeSource };
	var sql = 'INSERT INTO metadata SET ?';
	connection.query(sql, recipe, function (err, res) {
		if (err) throw err;
		console.log('Successful');
	});
	connection.end();
}

exports.getRecipe = function(recipeID) {
	console.log(recipeID);
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

	var sql = 'SELECT * FROM metadata';
	var data;
	connection.query(sql, function (err, res) {
		data = res;
	});
	connection.end();

	return data.json();
}