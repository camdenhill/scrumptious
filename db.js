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

exports.insertRecipeIngredient = function(recipeID, quantity, item) {
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

	var ingredient = { recipeID: recipeID, quantity: quantity, item: item };
	var sql = 'INSERT INTO ingredients SET ?';
	connection.query(sql, ingredient, function (err, res) {
		if (err) throw err;
		console.log('Successful');
	});
	connection.end();
}


/*
	The way I set this up is the following:
	getRecipe returns an inner join on ingredients and metadata;
	will include list of ingredients as well as color, recipe name.
*/
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

	var sql = 'SELECT * FROM ingredients INNER JOIN metadata ON ingredients.recipeID = metadata.recipeID WHERE ingredients.recipeID = ?';
	var data;
	connection.query(sql, recipeID, function (err, res) {
		connection.end();
		console.log(res);
		callback(err, res);
	});
}

/*
	The way I set this up is the following:
	getRecipeSteps returns json data containing steps.
*/
exports.getRecipeSteps = function(recipeID, callback) {
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

	var sql = 'SELECT * FROM steps WHERE steps.recipeID = ? ORDER BY steps.stepStart';
	var data;
	connection.query(sql, recipeID, function (err, res) {
		connection.end();
		console.log(res[0]['stepStart'].getMinutes() - res[0]['stepEnd'].getMinutes());
		callback(err, res);
	});
}