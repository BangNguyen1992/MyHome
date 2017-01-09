(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('ImgEditorCtrl', ImgEditorCtrl);

	ImgEditorCtrl.$inject = ['$scope'];

	function ImgEditorCtrl($scope) {

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

		$scope.vignList = [
			{
				src: "img/imgEditor/vignette.jpg"
			},
			{
				src: "img/imgEditor/vignette1.jpg"
			},
			{
				src: "img/imgEditor/vignette2.jpg"
			},
			{
				src: "img/imgEditor/vignette3.jpg"
			},
			{
				src: "img/imgEditor/vignette4.jpg"
			},
			{
				src: "img/imgEditor/vignette5.jpg"
			},
			{
				src: "img/imgEditor/vignette6.jpg"
			},
			{
				src: "img/imgEditor/vignette7.jpg"
			},
			{
				src: "img/imgEditor/vignette8.jpg"
			}
			
		]


		$scope.init = function () {
			// initialize default values for variables
			$scope.brightness = 0;
			$scope.contrast = 1;
			$scope.glossy = 0;
			$scope.gradientTop = "#FFFFFF";
			$scope.gradientBottom = "#FFFFFF";
			$scope.strength = 1;
			$scope.color = {
				red: 127,
				green: 10,
				blue: 10
			};

			$scope.autocontrast = false;
			$scope.vignette = false;
			$scope.canvas = angular.element('#myCanvas')[0];
			$scope.ctx = $scope.canvas.getContext('2d');
			$scope.image = new Image();

			$scope.vignImage = new Image();
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

			// Load vignette image	
			$scope.vignImage.src = $scope.vignSrc;
			$scope.vignImage.onload = resetVign();

		};

		//Default style
		$scope.selected = 0;
		$scope.vignSrc = $scope.vignList[0].src;

		$scope.clickImage = function (src, index) {
			$scope.vignSrc = src;
			$scope.selected = index;
		}

		$scope.imageAdjust = function () {
			$scope.resetImage();
			$scope.imageData = $scope.ctx.getImageData(0, 0, $scope.image.width, $scope.image.height);
			$scope.pixels = $scope.imageData.data;
			$scope.numPixels = $scope.imageData.width * $scope.imageData.height;

			brightAdjust();
			contrastAdjust();
			tint();


			if ($scope.vignette) {
				setVignette();
			}
			//Clear the rectangle equal to canvas size
			$scope.ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);

			//re-display img after adjust
			$scope.ctx.putImageData($scope.imageData, 0, 0);
		};


		var brightAdjust = function () {
			$scope.brightInt = parseInt($scope.brightness);
			for (var i = 0; i < $scope.numPixels; i++) {
				$scope.pixels[i * 4] += $scope.brightInt;
				$scope.pixels[i * 4 + 1] += $scope.brightInt;
				$scope.pixels[i * 4 + 2] += $scope.brightInt;
			}
		};

		var contrastAdjust = function () {
			$scope.contrastInt = parseFloat($scope.contrast);
			for (var i = 0; i < $scope.numPixels; i++) {
				$scope.pixels[i * 4] = ($scope.pixels[i * 4] - 128) * $scope.contrastInt + 128;
				$scope.pixels[i * 4 + 1] = ($scope.pixels[i * 4 + 1] - 128) * $scope.contrastInt + 128;
				$scope.pixels[i * 4 + 2] = ($scope.pixels[i * 4 + 2] - 128) * $scope.contrastInt + 128;
			}
		};

		var resetVign = function () {
			var cn = document.createElement('canvas');
			// Make the cn the same width adnd height as the same image
			cn.width = $scope.image.width;
			cn.height = $scope.image.height;

			// Get the context of cn            
			var ctx = cn.getContext('2d');

			// Draw the vignette image to ctx
			ctx.drawImage($scope.vignImage, 0, 0, $scope.vignImage.width, $scope.vignImage.height, 0, 0, cn.width, cn.height);
			$scope.vignData = ctx.getImageData(0, 0, cn.width, cn.height); // Get the image data of the vignette
			$scope.vignPixels = $scope.vignData.data; // Get the pixels from imageDATA
		};

		var setVignette = function () {
			//			console.log($scope.vignData.data);
			// Po = Pi + Pv /255;  
			for (var i = 0; i < $scope.numPixels; i++) {
				$scope.pixels[i * 4] = $scope.pixels[i * 4] * $scope.vignPixels[i * 4] / 255; // Red
				$scope.pixels[i * 4 + 1] = $scope.pixels[i * 4 + 1] * $scope.vignPixels[i * 4 + 1] / 255; // Green
				$scope.pixels[i * 4 + 2] = $scope.pixels[i * 4 + 2] * $scope.vignPixels[i * 4 + 2] / 255; // Blue

			}
		};

		var tint = function () {
			$scope.redInt = parseInt($scope.color.red);
			$scope.greenInt = parseInt($scope.color.green);
			$scope.blueInt = parseInt($scope.color.blue);
			$scope.strengthInt = parseInt($scope.strength);
			for (var i = 0; i < $scope.numPixels; i++) {
				$scope.pixels[i * 4] = $scope.pixels[i * 4] + $scope.color.red * $scope.strength / 100; // Red
				$scope.pixels[i * 4 + 1] = $scope.pixels[i * 4 + 1] + $scope.color.green * $scope.strength / 100; // Green
				$scope.pixels[i * 4 + 2] = $scope.pixels[i * 4 + 2] + $scope.color.blue * $scope.strength / 100; // Blue

			}
		};


		//		$scope.select = function (index) {
		//			$scope.selected = index;
		//		};


		$scope.saveImage = function () {
			var imgAsDataUrl = $scope.canvas.toDataURL('images/png');
			$scope.url = imgAsDataUrl;

		};

	}
})();