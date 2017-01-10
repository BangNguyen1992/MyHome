(function ($) {
	"use strict"; // Start of use strict

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	//	$('a.page-scroll').on('click', function (event) {
	//		var $anchor = $(this);
	//		console.log(this)
	//		$('html, body').stop().animate({
	//			scrollTop: ($($anchor.attr('href')).offset().top - 50)
	//		}, 650, 'easeInOutExpo');
	//		event.preventDefault();
	//	});

	$('.top').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 650);
		return false;
	});

	//     Highlight the top nav as scrolling occurs
	$('.body').scrollspy({
		target: '.navbar-fixed-top',
		offset: 51
	});

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function () {
		$('.navbar-toggle:visible').click();
	});

	// Offset for Main Navigation
	$('#mainNav').affix({
		offset: {
			top: 100
		}
	})

	$(this).scrollTop(0);

	//Hide dropdown menu when click outside menu
	$(document).on('click', function (e) {
		$('.navbar-collapse').collapse('hide')
	});

})(jQuery); // End of use strict