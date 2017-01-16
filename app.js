'use strict';

var db = require('./db.js');

module.exports = function(app)
{
	app.get('/', function (req, res) {
		db.getGallery(function (err1, recipes) {
			if (err1) throw err1;
			db.getFeatured(function (err2, featured) {
				if (err2) throw err2;
				res.render('index.ejs', {
					recipes : recipes,
					featured : featured
				})
			})
		})
	})

	app.get('/new', function (req, res) {
		db.getCategories(function (err1, categories) {
			if (err1) throw err1;
			var galleryTitles = db.getGalleryTitles();
			console.log(galleryTitles);
			db.getGallery(function (err2, gallery) {
				if (err3) throw err3;
				console.log('hill');
				console.log(categories);
				console.log(gallery);
				res.render('newindex.ejs', {
					categories : categories,
					gallery : gallery,
					galleryTitles : galleryTitles
				})
			})
		})
	})

	app.get('/recipes/:recipeID', function (req, res) {
		db.getRecipe(req.params.recipeID, function (err1, ingredients) {
			if (err1) throw err1;
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