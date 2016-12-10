var config = {
	development: {
		// url to be used in link generation
		url: '',
		// mysql connection settings
		database: {
			host: '127.0.0.1',
			port: '3306',
			username: 'root',
			password: 'Ca1i4nia',
			db: 'recipes'
		},
		// server details
		server: {
			host: '127.0.0.1',
			port: '3000'
		}
	},
	production: {
		url: 'http://my.site.com',
		database: {
			host: '127.0.0.1',
			port: '3306',
			username: 'root',
			password: 'Ca1i4nia',
			db: 'recipes'
		},
		server: {
			host: '127.0.0.1',
			port: '3000'
		}
	}
};
module.exports = config;