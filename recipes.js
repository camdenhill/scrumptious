exports.renderRecipe = function(res, results) {
	res.write('
		<body ng-app="app">
			<nav>	<!--Contains logo, searchbar, profile icon, bookmarks-->
				<img src="/img/LogoFill.png">
				<img src="/img/Bookmark.png">
				<input type="text" class="main-search"/>
			</nav>

			<div class="upper">	<!--Contains icon, title, rating, comments icon, prompt to serve #, dropdown serve #-->
				<img src="/img/Pie.png">
				<h1>Chicken Pot Pie</h1>
				<ul class="ratings-and-comment">
					<li><img src="/img/StarFull.png"</li>
					<li><img src="/img/StarFull.png"</li>
					<li><img src="/img/StarFull.png"</li>
					<li><img src="/img/StarFull.png"</li>
					<li><img src="/img/StarHalf.png"</li>
					<li><img src="/img/Comment.png"</li>
				</ul>
				<div class="how-many-serve-div">
					<h3 class="how-many-serve-h3">How many people do you want to serve?</h3>
					<select class="how-many-serve-select">
						<% for(var i=0; i<=12; i++) { %>
							<option><%= i %></option>
						<% } %>
					</select>
				</div>
			</div>
	');
	res.write('<p>' + results[0]['recipeName'] + '</p>');
	res.write('</body></html>');
}