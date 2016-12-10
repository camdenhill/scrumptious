var mysql = require('mysql'),

var connection = mysql.createConnection({
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password
});

exports.connectDB = function() {
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