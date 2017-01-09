(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('GradientCtrl', GradientCtrl);

	GradientCtrl.$inject = ['$scope'];

	function GradientCtrl($scope) {

		
		$scope.setImageFile = function (element) {
			// $scope.init();
			// get the image from element
			// start to put the file into canvas element
			// fileReader
			// onload event
			var reader = new FileReader();
			reader.onload = function (e) {
				//set img src
				$scope.image.src = e.target.result;
			};
			reader.readAsDataURL(element.files[0]);
			$scope.image.onload = $scope.resetImage;
			console.log(element);
//			console.log("img", $scope.image)
		};


		$scope.init = function () {
			// initialize default values for variables
			$scope.vignette = 0.5;
//			$scope.gradientTop = "#FFFFFF";
//			$scope.gradientBottom = "#FFFFFF";
			
			$scope.canvas = angular.element('#myCanvas')[0];
			$scope.ctx = $scope.canvas.getContext('2d'); // get 2d context of canvas
			$scope.image = new Image();
		};

		$scope.init();

		$scope.resetImage = function () {
			// when image date is loaded, (after on load)
			// put the data into canvas element
			// Read pixel data

			// Set size to match canvas size
			$scope.canvas.width = $scope.image.width;
			$scope.canvas.height = $scope.image.height;

			$scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width, $scope.canvas.height);

		};

		
		$scope.gradientAdjust = function () {
			
			var newImage = document.getElementById('myCanvas').appendChild($scope.image);

			$scope.ctx.drawImage($scope.image, 0, 0, $scope.image.width, $scope.image.height);
			// Create gradients
			var gradient = $scope.ctx.createLinearGradient(0, 0, 0, $scope.image.height);
			gradient.addColorStop(0, $scope.gradientTop);
			gradient.addColorStop(1, $scope.gradientBottom);

			//			$scope.ctx.globalCompositeOperation = 'destination-out';
			$scope.ctx.fillStyle = gradient;
			$scope.ctx.fillRect(0, 0, $scope.image.width, $scope.image.height);
		}

		
		$scope.saveImage = function () {
			var imgAsDataUrl = $scope.canvas.toDataURL('images/png');
			$scope.url = imgAsDataUrl;

		};

	}
})();