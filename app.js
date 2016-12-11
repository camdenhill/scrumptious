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

	app.post('/inserted', function(req, res) {
		console.log(req.body.colorHex)
		console.log(req.body.recipeName)
		console.log(req.body.recipeSource)

		res.render('insert.html')
	})

	app.use(function(req, res, next) {
		res.status(404).render('404.html');
	});
}