var mysql = require('mysql'),
	async = require('async');

var PRODUCTION_DB = 'app_prod_database',
	TEST_DB = 'app_test_db';

var connection = mysql.createConnection({
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password
})

connection.connect();

var sql = 'SELECT * FROM mysql.user';

connection.query(sql, function (err, rows, fields) {
	if (err) throw err;
	console.log(rows[0].user);
})

connection.end();