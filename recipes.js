exports.renderRecipe = function(res, results) {
	res.write('<html><head></head><body>');
	res.write('<p>' + results[0].recipeID + '</p>');
	res.write('</body></html>');
}