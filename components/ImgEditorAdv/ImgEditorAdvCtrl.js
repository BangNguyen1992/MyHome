(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('ImgEditorAdvCtrl', ImgEditorAdvCtrl);

	ImgEditorAdvCtrl.$inject = ['$scope'];

	function ImgEditorAdvCtrl($scope) {
		
		$scope.init = function () {
			// initialize default values for variables
			$scope.vigette = 0.5;

			$scope.image = new Image();
		};

		$scope.init();

		$scope.setImageFile = function (element) {
			// fileReader
			// onload event
			var reader = new FileReader();
			reader.onload = function (e) {
				//set img src
				$scope.image.src = e.target.result;
			};
			reader.readAsDataURL(element.files[0]);
			$scope.image.onload = $scope.showImage;

		};


		$scope.showImage = () =>{
			var newImage = angular.element('#imgContainer')[0]
			.appendChild($scope.image);
			newImage.className = "img-responsive imagedropshadow"
			
//			var newImageSrc = angular.element('#myImg')[0]
//			.src = $scope.image.src;



			console.log(newImage)
		};

		
		
//		$scope.saveImage = function () {
//			var imgAsDataUrl = $scope.canvas.toDataURL('images/png');
//			$scope.url = imgAsDataUrl;
//
//		};

	}
})();