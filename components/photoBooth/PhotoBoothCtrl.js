(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('PhotoBoothCtrl', PhotoBoothCtrl);

	PhotoBoothCtrl.$inject = ['$scope'];

	function PhotoBoothCtrl($scope) {

		var video = document.querySelector('.player');
		var canvas = document.querySelector('.photo');
		var ctx = canvas.getContext('2d');
		var strip = document.querySelector('.strip');
		var snap = document.querySelector('.snap');

		$scope.color = {
			red: 0,
			green: 0,
			blue: 0
		};

		$scope.colorSplit = {
			red: 0,
			green: 0,
			blue: 0
		}
		
		$scope.alpha = 1;



		function getVideo() {
			navigator.mediaDevices.getUserMedia({
					video: true,
					audio: false
				})
				.then(localMediaStream => {
					try {
						video.srcObject = localMediaStream;
					} catch (error) {
						video.src = window.URL.createObjectURL(localMediaStream);
					}

					video.play();
				})
				.catch(err => {
					//				alert(`OH NO !!!`, err);
					console.error(`OH NO !!!`, err);
				})
		}

		getVideo();

		function paintToCanvas() {
			//			get width and height of the video
			var width = video.videoWidth;
			var height = video.videoHeight;
			//			set canvas width and height the same as video
			canvas.width = width;
			canvas.height = height;

			return setInterval(() => {
				ctx.drawImage(video, 0, 0, width, height);
				//Take the pixels out
				$scope.pixels = ctx.getImageData(0, 0, width, height);
				// console.log('object ctx', ctx);
				//colorEffect
				$scope.pixels = colorEffect($scope.pixels);
				
				//Color split
				$scope.pixels = colorSpliting($scope.pixels);

				
				ctx.globalAlpha = $scope.alpha;

				// Put them back
				ctx.putImageData($scope.pixels, 0, 0)

			}, 30);
		}

		//When finished loaded and is playing, video will emit an event called "canplay", if we call paintToCanvas before the video is played, the videoWidth and height will be 0
		video.addEventListener('canplay', paintToCanvas);

		function colorEffect(pixels) {
//			$scope.redInt = parseInt($scope.color.red);
//			$scope.greenInt = parseInt($scope.color.green);
//			$scope.blueInt = parseInt($scope.color.blue);
			for (let i = 0; i < pixels.data.length; i += 4) {
				pixels.data[i + 0] = pixels.data[i + 0] + $scope.color.red; // RED
				pixels.data[i + 1] = pixels.data[i + 1] + $scope.color.green; // GREEN
				pixels.data[i + 2] = pixels.data[i + 2] + $scope.color.blue; // Blue
//				console.count("yolo")
			}
			return pixels;
		}
		
		function colorSpliting(pixels) {
			var redInt = parseInt($scope.colorSplit.red);
			var greenInt = parseInt($scope.colorSplit.green);
			var blueInt = parseInt($scope.colorSplit.blue);
			for (let i = 0; i < pixels.data.length; i += 4) {
//				pixels.data[i + $scope.colorSplit.red] = pixels.data[i + 0]; // RED
//				pixels.data[i + $scope.colorSplit.green] = pixels.data[i + 1]; // GREEN
//				pixels.data[i + $scope.colorSplit.blue] = pixels.data[i + 2]; // Blue
				pixels.data[i + 0] = pixels.data[i + 0 + $scope.colorSplit.red]; // RED
				pixels.data[i + 1] = pixels.data[i + 1 + $scope.colorSplit.green]; // GREEN
				pixels.data[i + 2] = pixels.data[i + 2 + $scope.colorSplit.blue]; // Blue
			}
			return pixels;
		}


		$scope.takePhoto = function () {
			//			play the sound
			snap.currentTime = 0;
			snap.play();

			//			take the image out of canvas
			var data = canvas.toDataURL('image/jpg');
			var link = document.createElement('a');
			link.href = data;
			link.setAttribute('download', 'download');
			//			link.textContent = 'Download Image';
			link.innerHTML = `<img src="${data}" alt="Take photo"/>`;
			strip.insertBefore(link, strip.firstChild);
		}


		
		
		//
		//function rgbSplit(pixels) {
		//  for(let i = 0; i < pixels.data.length; i+=4) {
		//    pixels.data[i - 150] = pixels.data[i + 0]; // RED
		//    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
		//    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
		//  }
		//  return pixels;
		//}
		//
		//function greenScreen(pixels) {
		//  const levels = {};
		//
		//  document.querySelectorAll('.rgb input').forEach((input) => {
		//    levels[input.name] = input.value;
		//  });
		//
		//  for (i = 0; i < pixels.data.length; i = i + 4) {
		//    red = pixels.data[i + 0];
		//    green = pixels.data[i + 1];
		//    blue = pixels.data[i + 2];
		//    alpha = pixels.data[i + 3];
		//
		//    if (red >= levels.rmin
		//      && green >= levels.gmin
		//      && blue >= levels.bmin
		//      && red <= levels.rmax
		//      && green <= levels.gmax
		//      && blue <= levels.bmax) {
		//      // take it out!
		//      pixels.data[i + 3] = 0;
		//    }
		//  }
		//
		//  return pixels;
		//}
		//
		//getVideo();
		//
		//		video.addEventListener('canplay', paintToCanavas);


	}
})();