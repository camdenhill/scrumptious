var mysql = require('mysql');
var config = require('./config.js');

var connection;

exports.insertRecipeMetadata = function(colorHex, recipeName, recipeSource) {
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

exports.insertRecipeStep = function(recipeID, stepText, stepStart, stepEnd, stepDuration) {
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

	var step = { recipeID: recipeID, stepText: stepText, stepStart: stepStart, stepEnd: stepEnd, stepDuration: stepDuration };
	var sql = 'INSERT INTO steps SET ?';
	connection.query(sql, step, function (err, res) {
		if (err) throw err;
		console.log('Successful');
	});
	connection.end();
}

exports.getRecipe = function(recipeID, callback) {
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

	var sql = 'SELECT * FROM (SELECT * FROM ingredients INNER JOIN metadata ON ingredients.recipeID = metadata.recipeID) AS ingredients_metadata INNER JOIN steps ON steps.recipeID = ingredients_metadata.recipeID WHERE ingredients.recipeID = ?';
	var data;
	connection.query(sql, recipeID, function (err, res) {
		connection.end();
		console.log(res);
		callback(err, res);
	});
}