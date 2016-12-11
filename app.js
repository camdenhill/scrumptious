var db = require('./db.js');

module.exports = function(app)
{
	app.route('/')
	.get(function (req, res) {
		res.render('index.ejs')
	});

	/*
	app.get('/recipes/:recipeId', function (req, res) {
		res.send(req.params)
	})
	*/

	app.get('/recipes', function (req, res) {
		res.render('recipes.ejs')
	})

	app.get('/recipes/:recipeID', function (req, res) {
		db.getRecipe(req.params.recipeID, function (err, results) {
			if (err) throw err;
			else {
				console.log(results)
				res.render('recipes.ejs', {
					recipes : results
				});
			}
		});
	})

	app.get('/insert', function (req, res) {
		res.render('insert.ejs')
	})

	app.post('/inserted', function(req, res) {
		var colorHex, recipeName, recipeSource;
		colorHex = req.body.colorHex;
		recipeName = req.body.recipeName;
		recipeSource = req.body.recipeSource;

		db.insertRecipe(colorHex, recipeName, recipeSource);
		res.render('success.ejs')
	})

	app.use(function(req, res, next) {
		res.status(404).render('404.ejs');
	});
}