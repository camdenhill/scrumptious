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
				var steps = {stepText: 'test'}
				var date = new Date();
				var time = (date.getHours()+7) + ':' + date.getMinutes();
				res.render('recipes', {
					ingredients : results,
					steps : steps,
					recipeName : results[0]['recipeName'],
					time : time
				});
			}
		});
	})

	app.get('/insert', function (req, res) {
		res.render('insert.ejs')
	})

	app.post('/inserted', function(req, res) {
		var recipeID, stepText, stepStart, stepEnd, stepDuration;
		recipeID = req.body.recipeID;
		stepText = req.body.stepText;
		stepStart = req.body.stepStart;
		stepEnd = req.body.stepEnd;
		stepDuration = req.body.stepDuration;

		db.insertRecipeStep(recipeID, stepText, stepStart, stepEnd, stepDuration);
		res.render('success.ejs')
	})

	app.use(function(req, res, next) {
		res.status(404).render('404.ejs');
	});
}