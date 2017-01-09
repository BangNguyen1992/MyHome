//var main = () => {
//
//
//	$('body').on('keydown', (e) => {
//		var sound = $('audio[data-key="' + e.keyCode + '"]');
//		var key = $('div[data-key="' + e.keyCode + '"]');
//
//		key.addClass("playing");
//
//		if (!sound) return; // stop function when press key with no sound
//		sound[0].currentTime = 0; // for playing the sound faster
//		sound[0].play(); // play the sound
//
//		$('body').on('keyup', () => {
//			key.removeClass("playing");
//
//		})
//	})
//
//}
//
////$(document).ready(main);
//$('.drum-kit').ready(main);

(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('DrumKitCtrl', DrumKitCtrl);

	DrumKitCtrl.$inject = ['$scope'];

	function DrumKitCtrl($scope) {

		$scope.keydown = function ($event) {
			var keyCode = $event.which || $event.keyCode;
			$scope.keydownkeycode = $event.keyCode;
			$scope.keyupkeycode = "";
			$scope.keypresskeycode = "";
			console.log(keyCode);
		};
		$scope.keyup = function (event) {
			$scope.keyupkeycode = event.keyCode;
		};
		
		

		//		active();
		//
		//		function active() {
		//			$('body').on('keydown', (e) => {
		//				var sound = $('audio[data-key="' + e.keyCode + '"]');
		//				var key = $('div[data-key="' + e.keyCode + '"]');
		//
		//				key.addClass("playing");
		//
		//				if (!sound) return; // stop function when press key with no sound
		//				sound[0].currentTime = 0; // for playing the sound faster
		//				sound[0].play(); // play the sound
		//
		//				$('body').on('keyup', () => {
		//					key.removeClass("playing");
		//
		//				})
		//			})
		//		}


	}
})();