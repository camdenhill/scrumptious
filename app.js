var db = require('./db.js');

module.exports = function(app)
{
	app.route('/')
	.get(function (req, res) {
		res.render('index.ejs')
	});

	app.get('/recipes', function (req, res) {
		res.render('recipes.ejs')
	})

	app.get('/recipes/:recipeID', function (req, res) {
		db.getRecipe(req.params.recipeID, function (err, ingredients) {
			if (err) throw err;
			else {
				db.getRecipeSteps(req.params.recipeID, function (err2, steps) {
					if (err2) throw err2;
					else {
						var date = new Date();
						var time = (date.getHours()+7) + ':' + date.getMinutes();
						res.render('recipes', {
							ingredients : ingredients,
							steps : steps,
							recipeName : ingredients[0]['recipeName'],
							time : time
						});		
					}
				})
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