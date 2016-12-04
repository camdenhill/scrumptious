$(document).ready(function() {
	var ganttFull = $('#gantt-full');
	var ingredientsFull = $('#ingredients-full');
	var chartFull = $('#chart-full');
	var startCookingAtFull = $('#start-cooking-at-full');
	var chartWidth = $(document).width() - parseInt(ingredientsFull.css('width'), 10);

	ganttFull.css('width', $(document).width());
	ganttFull.css('height', $(document).height());
	chartFull.css('width', chartWidth);
	console.log(chartWidth);
	startCookingAtFull.css('width', chartWidth);
});