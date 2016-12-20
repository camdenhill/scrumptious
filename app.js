var db = require('./db.js');
var showcase = require('./showcase.js')

module.exports = function(app)
{
	app.get('/', function (req, res) {
		res.render('index.ejs', {
			gallery : ['3','7']
		});
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
						for (var i=0; i<steps.length; i++) {
							console.log(steps[i]['stepStart']);
						}
						var time = (date.getHours()+7) + ':' + date.getMinutes();
						res.render('recipes', {
							ingredients : ingredients,
							steps : steps,
							// marginLeft : 'style="margin-left: ' + marginLeft + 'px"',
							recipeName : ingredients[0]['recipeName'],
							source : ingredients[0]['recipeSource'],
							// color : "/css/colors/"+ingredients[0]['colorHex']+".css",
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

	app.post('/inserted-step', function(req, res) {
		var recipeID, stepText, stepStart, stepEnd, stepDuration;
		recipeID = req.body.recipeID;
		stepText = req.body.stepText;
		stepStart = req.body.stepStart;
		stepEnd = req.body.stepEnd;
		stepDuration = req.body.stepDuration;

		db.insertRecipeStep(recipeID, stepText, stepStart, stepEnd, stepDuration);
		res.render('success.ejs')
	})

	app.post('/inserted-ingredient', function(req, res) {
		var recipeID, stepText, stepStart, stepEnd, stepDuration;
		recipeID = req.body.recipeID;
		quantity = req.body.quantity;
		item = req.body.item;

		db.insertRecipeIngredient(recipeID, quantity, item);
		res.render('success.ejs')
	})


	app.use(function(req, res, next) {
		res.status(404).render('404.ejs');
	});
}