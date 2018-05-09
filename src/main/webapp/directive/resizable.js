angular.module("myApp").directive('resizer', function($document) {

	return function($scope, $element, $attrs) {

		$element.on('mousedown', function(event) {
			event.preventDefault();

			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});

		function mousemove(event) {

			if ($attrs.resizer == 'vertical') {
				// Handle vertical resizer
				var x = event.pageX - $($attrs.resizerParent).offset().left;
				if ($attrs.resizerMax && x > $attrs.resizerMax) {
					x = parseInt($attrs.resizerMax);
				}
                                
                                if (x < 0) {
                                        x = 0;
                                }
                                
                                var width = $($attrs.resizerParent).width();
                                
                                if (x > width) {
                                        x = width;
                                }
                                
                                var persent = x / width * 100.0;
                                var offpersent = 100 - persent;
                                
				$element.css({
					left: persent + '%'
				});

				$($attrs.resizerLeft).css({
					width: persent + '%'
				});
				$($attrs.resizerRight).css({
					left: offpersent + '%'
				});
                                $($attrs.resizerRight).css({
					width: offpersent + '%'
				});

			} else {
				// Handle horizontal resizer
				var y = $($attrs.resizerParent).offset().top + $($attrs.resizerParent).height() - event.pageY 
                                        - 6;
//                                console.log(y);
                                if (y < 0) {
                                        y = 0;
                                }
                                if (y > $($attrs.resizerParent).height()) {
                                       y = $($attrs.resizerParent).height(); 
                                }
                                
                                
                                var persent = y / $($attrs.resizerParent).height() * 100;
                                var offpersent = 100 - persent;
                                
                                var oPersent = 6 / $($attrs.resizerParent).height() * 100;

				$element.css({
					top: -persent + '%'
				});

				$($attrs.resizerTop).css({
					height: offpersent + '%'
				});
                                
                                $($attrs.resizerBottom).css({
					top: offpersent + '%'
				});
				$($attrs.resizerBottom).css({
					height: persent - oPersent + '%'
				});
			}
		}

		function mouseup() {
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}
	};
});