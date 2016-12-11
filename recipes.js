exports.renderRecipe = function(res, results) {
	res.write('<html><head></head><body>');
	res.write('<p>' + results[0].json() + '</p>');
	res.write('</body></html>');
}