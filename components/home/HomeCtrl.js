(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['$scope'];

	function HomeCtrl($scope) {

		//Loading on scroll
		var debounce = function (func, wait = 20, immediate = true) {
			var timeout;
			return function () {
				var context = this,
					args = arguments;
				var later = function () {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		}

		var sliderImages = document.querySelectorAll('.slide-in');
		var width = document.documentElement.clientWidth;

		function checkSlide(e) {
			sliderImages.forEach(sliderImage => {
				var slideInAt = (window.scrollY + window.innerHeight) - sliderImage.clientHeight;
				//					console.log(slideInAt/4, sliderImage.offsetHeight);
				// bottom of the image
				var imageBottom = sliderImage.offsetHeight + sliderImage.clientHeight;
				var isHalfShown = slideInAt / 4.2 > sliderImage.offsetHeight;

				var isNotScrolledPast = window.scrollY / 4.2 < imageBottom;
				//					console.log(window.scrollY / 2, imageBottom)

				if (isHalfShown && isNotScrolledPast) {
					sliderImage.classList.add('active');
				} else {
					sliderImage.classList.remove('active');
				}
			});
		}

		if(width > 1024)
			window.addEventListener('scroll', debounce(checkSlide));
		else
			sliderImages.forEach(sliderImage => {sliderImage.classList.add('active')})
		
		//Animation on click
		var panels = document.querySelectorAll('.panel');

		var toggleOpen = function () {
			console.log(this);
			this.classList.toggle('open');
			this.classList.toggle('open-active');
		}

		panels.forEach(panel => panel.addEventListener('click', toggleOpen));


	}
})();