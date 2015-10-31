// http://net.tutsplus.com/tutorials/html-css-techniques/how-to-build-cross-browser-html5-forms/
// rather than spending ages working out how to get sliders working in firefox, I'm just using this (because really this is me messing around in html5, not in jquery :I)

var initSlider = function() {
	$('input[type=range]').each(
		function() {
			var $input = $(this);
			var $slider = $('<div id="' + $input.attr('id') + '" class="' + $input.attr('class') + '"></div>');
			var step = $input.attr('step');
			$input.after($slider).hide();
			$slider.slider({
				min: $input.attr('min'),
				max: $input.attr('max'),
				step: $input.attr('step'),
				change: function(e, ui) {
					$(this).val(ui.value);
				}
			});
		}
	);
};