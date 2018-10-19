(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['$scope'];

	function HomeCtrl($scope) {
		//Loading on scroll
		const debounce = function (func, wait = 20, immediate = true) {
			let timeout;
			return function () {
				const context = this,
					args = arguments;
				const later = function () {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				const callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		}

		function offset(el) {
			var rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}

		const sliderImages = document.querySelectorAll('.slide-in');
		const width = document.documentElement.clientWidth;

		function checkSlide(e) {
			sliderImages.forEach(sliderImage => {
				// get bottom of the view
				const slideInAt = window.scrollY + window.innerHeight;
				// get image offset
				const imageOffset = offset(sliderImage);

				if (slideInAt >= imageOffset.top) {
					sliderImage.classList.add('active');
				} else {
					sliderImage.classList.remove('active');
				}
			});
		}

		function init() {
			if (width > 1024) {
				window.addEventListener('scroll', debounce(checkSlide, 20));
			}	else {
				sliderImages.forEach(sliderImage => {
					sliderImage.classList.add('active');
				});
				$('#static').removeClass('animated');
			}
		}

		init();

		//Animation on click
		const panels = document.querySelectorAll('.panel');

		const toggleOpen = function () {
			// console.log(this);
			this.classList.toggle('open');
			this.classList.toggle('open-active');
		}

		panels.forEach(panel => panel.addEventListener('click', toggleOpen));

		$('a.page-scroll').on('click', function (event) {
		const $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: ($($anchor.attr('data-href')).offset().top - 50)
		}, 550, 'easeInOutExpo');
		event.preventDefault();
	});

	}
})();