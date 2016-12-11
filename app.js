module.exports = function(app)
{
	app.route('/')
	.get(function (req, res) {
		res.render('index.html')
	});

	/*
	app.get('/recipes/:recipeId', function (req, res) {
		res.send(req.params)
	})
	*/

	app.get('/recipes', function (req, res) {
		res.render('recipes.html')
	})

	app.get('/insert', function (req, res) {
		res.render('insert.html')
	})

	app.post('/insert', function(req, res) {
		console.log(req.body.test)
	})

	app.use(function(req, res, next) {
		res.status(404).render('404.html');
	});
}