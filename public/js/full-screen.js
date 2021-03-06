$(document).ready(function() {
	var gantt, ingredients, chart, chartWidth;
	var originalGanttWidth;
	var originalGanttHeight;
	var originalGanttPosition;
	var originalChartWidth;

	gantt = $('.gantt');
	ingredients = $('.ingredients');
	chart = $('.chart');

	originalGanttWidth = gantt.width();
	originalGanttHeight = gantt.height();
	originalGanttPosition = gantt.css('position');
	originalChartWidth = chart.width();

	$('#expand').click(function() {
		fullScreen(gantt, ingredients, chart, chartWidth);

		$('.lightbox').show();
		$(this).hide();
		$('.lightbox').delay(1000).fadeOut(1000);
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			shrinkScreen(gantt, ingredients, chart, chartWidth, originalGanttWidth, originalGanttHeight, originalGanttPosition, originalChartWidth);
			$('.lightbox').hide();
			$('#expand').show();
		}
	});
});

function fullScreen (gantt, ingredients, chart, chartWidth) {
	gantt.css('width', $(document).width());
	gantt.css('height', $(document).height());
	gantt.css('position', 'absolute');
	gantt.css('top', '0');
	gantt.css('left', '0');
	chartWidth = $(document).width() - parseInt(ingredients.css('width'), 10);
	chartWidth -= 4;
	chart.css('width', chartWidth);
}

function shrinkScreen (gantt, ingredients, chart, chartWidth, originalGanttWidth, originalGanttHeight, originalGanttPosition, originalChartWidth) {
	gantt.css('width', originalGanttWidth);
	gantt.css('height', originalGanttHeight);
	gantt.css('position', originalGanttPosition);
	chart.css('width', originalChartWidth);
}