'use strict';

var mysql = require('mysql');
var config = require('./config.js');
var showcase = require('./showcase.js')

var connection;

exports.insertRecipe = function(metadata, callback) {
	var recipeName, recipeSource, recipeImg, description;
	recipeName = metadata.recipeName;
	recipeSource = metadata.recipeSource;
	recipeImg = metadata.recipeImg;
	description = metadata.description;

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

	var recipe = { recipeName: recipeName, recipeSource: recipeSource, recipeImg: recipeImg, description: description };
	var sql = 'INSERT INTO metadata SET ?';
	connection.query(sql, recipe, function (err, res) {
		if (err) throw err;
		console.log(res.insertId);
		connection.end();
		callback(err, res.insertId);
	});
}

exports.insertRecipeStep = function(recipeID, stepText, stepStart, stepEnd) {
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

	var hours = parseInt(stepEnd.split(":")[0]) - parseInt(stepStart.split(":")[0]);
	var minutes = parseInt(stepEnd.split(":")[1]) - parseInt(stepStart.split(":")[1]);
	var seconds = parseInt(stepEnd.split(":")[2]) - parseInt(stepStart.split(":")[2]);
	switch (hours) {
		case 0:
			hours = "";
			break;
		case 1:
			hours = "1 hour ";
			break;
		default:
			hours = hours + " hours ";
	}
	switch (minutes) {
		case 0:
			minutes = "";
			break;
		case 1:
			minutes = "1 minute ";
			break;
		default:
			minutes = minutes + " minutes ";
	}
	switch (seconds) {
		case 0:
			seconds = "";
			break;
		case 1:
			seconds = "1 second";
			break;
		default:
			seconds = seconds + " seconds";
	}
	var stepDuration = hours + minutes + seconds;
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
	Get all recipe metadata for recipes in gallery (subset of recipes to be displayed on index)
*/
exports.getRecipe = function(recipes, callback) {
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

	var sql = 'SELECT * FROM metadata WHERE recipeID IN ' + recipes;
	var data;
	connection.query(sql, function (err, res) {
		connection.end();
		console.log(res);
		callback(err, res);
	});
}

/*
	The way I set this up is the following:
	getRecipe returns an inner join on ingredients and metadata;
	will include list of ingredients as well as recipe name, etc.
*/
exports.getIngredients = function(recipeID, callback) {
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
exports.getSteps = function(recipeID, callback) {
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

	var sql = 'SELECT * FROM steps WHERE steps.recipeID = ? ORDER BY steps.stepStart, steps.stepEnd';
	var data;
	connection.query(sql, recipeID, function (err, res) {
		connection.end();
		callback(err, res);
	});
}

/*
	Get all recipe metadata for recipes in gallery (subset of recipes to be displayed on index)
*/
exports.getGalleryTitles = function() {
	return showcase.galleryTitles;
}

/*
	Get featured recipe
*/
exports.getFeatured = function(callback) {
	var featured = showcase.featured;

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

	var sql = 'SELECT * FROM metadata WHERE recipeID IN (' + featured + ')';
	var data;
	connection.query(sql, function (err, res) {
		connection.end();
		console.log(res);
		callback(err, res);
	});
}


/*
	getCategories returns the list of categories with their images
*/
exports.getCategories = function(callback) {
	var categories = showcase.categories;

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

	var sql = 'SELECT * FROM categories WHERE id IN ' + categories;
	var data;
	connection.query(sql, function (err, res) {
		connection.end();
		console.log(res);
		callback(err, res);
	});
}
/*
	getTips returns tip text and the date, appropriately formatted
*/
exports.getTips = function(callback) {
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

	var sql = "SELECT text, date_format(date, '%M %d, %Y') as date FROM tips ORDER BY date desc limit 3";
	connection.query(sql, function (err, res) {
		connection.end();
		console.log(res);
		callback(err, res);
	});
}