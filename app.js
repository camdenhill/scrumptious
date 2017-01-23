'use strict';

var db = require('./db.js');
var showcase = require('./showcase.js')

module.exports = function(app)
{
	app.get('/', function (req, res) {
		db.getCategories(function (err1, categories) {
			if (err1) throw err1;
			var galleryTitles = db.getGalleryTitles();
			db.getRecipe(showcase.gallery, function (err2, gallery) {
				if (err2) throw err2;
				db.getRecipe(showcase.featured, function (err3, featured) {
					if (err3) throw err3;
					db.getTips(function (err4, tips) {
						if (err4) throw err4;
						res.render('index.ejs', {
							categories : categories,
							gallery : gallery,
							featured : featured,
							galleryTitles : galleryTitles,
							tips : tips
						})
					})
				})
			})
		})
	})

	app.get('/recipes/:recipeID', function (req, res) {
		db.getIngredients(req.params.recipeID, function (err1, ingredients) {
			if (err1) throw err1;
			else {
				db.getSteps(req.params.recipeID, function (err2, steps) {
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
		res.render('new-insert.ejs')
	})

	app.get('/insert-steps-and-ingredients', function (req, res) {
		res.render('insert-steps-and-ingredients.ejs')
	})

	app.post('/inserted-recipe', function (req, res) {
		db.insertRecipe(req.body, function (err, recipeID) {
			res.render('insert-steps-and-ingredients.ejs', {
				recipeID : recipeID
			})
		});
	})

	app.post('/inserted-step', function(req, res) {
		var recipeID, stepText, stepStart, stepEnd;
		recipeID = req.body.recipeID;
		stepText = req.body.stepText;
		stepStart = req.body.stepStart;
		stepEnd = req.body.stepEnd;

		db.insertRecipeStep(recipeID, stepText, stepStart, stepEnd);
		res.render('success.ejs')
	})

	app.post('/inserted-ingredient', function (req, res) {
		var recipeID, quantity, item;
		recipeID = req.body.recipeID;
		quantity = req.body.quantity;
		item = req.body.item;

		db.insertRecipeIngredient(recipeID, quantity, item);
		res.render('success.ejs')
	})

	app.use(function (req, res, next) {
		res.status(404).render('404.ejs');
	});
}