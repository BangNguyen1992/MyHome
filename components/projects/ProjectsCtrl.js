(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('ProjectsCtrl', ProjectsCtrl);

	ProjectsCtrl.$inject = ['$scope'];

	function ProjectsCtrl($scope) {

	
		

//		var ww = $(window).width();
//		var wh = $(window).height();
//		//setup canvas enviroment
//			var time = new Date().getTime() * 0.002;
//			//console.log(time);
//			var color1 = "rgba(103,58,183 ,0.35)";
//			var color2 = "rgba(255,87,34 ,0.2)";
//			var canvas = document.querySelector(".hero-canvas");
//			$scope.ctx = canvas.getContext("2d");
//
//		// pure javascrip random function ============
//		function random(min, max) {
//			return Math.random() * (max - min) + min;
//		}
//
//		window.requestAnimFrame = (function () {
//			return window.requestAnimationFrame ||
//				function (callback, element) {
//					window.setTimeout(callback, 1000 / 60);
//				};
//		})();
//
//		function init() {} //end init
//
//		function animate() {
//			requestAnimFrame(animate);
//			draw();
//		}
//
//		function draw() {
//
//			
//			$scope.ctx.clearRect(0, 0, canvas.width, canvas.height);
//			$scope.ctx.save();
//
//			// random float to be used in the sin & cos
//			let randomX = random(.2, .9);
//			let randomY = random(.1, .2);
//
//			// sin & cos for the movement of the triangles in the canvas
//			let rectX = Math.cos(time * 1) * 1.5 + randomX;
//			let rectY = Math.sin(time * 1) * 1.5 + randomY;
//			let rectX2 = Math.cos(time * .7) * 3 + randomX;
//			let rectY2 = Math.sin(time * .7) * 3 + randomY;
//			let rectX3 = Math.cos(time * 1.4) * 4 + randomX;
//			let rectY3 = Math.sin(time * 1.4) * 4 + randomY;
//
//			//console.log(rectX + '-' + rectY + '-' + rectX2 + '-' + rectY2 + '-' + rectX3 + '-' + rectY3);
//
//			//triangle gradiente ==========================================
//			var triangle_gradient = $scope.ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//			triangle_gradient.addColorStop(0, color1);
//			triangle_gradient.addColorStop(1, color2);
//
//			//triangle group 1 ===========================================
//			// triangle 1.1
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX2 + 120, rectY2 - 100);
//			$scope.ctx.lineTo(rectX2 + 460, rectY2 + 80);
//			$scope.ctx.lineTo(rectX2 + 26, rectY2 + 185);
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			//triangle 1.2
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX - 50, rectY - 25);
//			$scope.ctx.lineTo(rectX + 270, rectY + 25);
//			$scope.ctx.lineTo(rectX - 50, rectY + 195);
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			//triangle 1.3
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX3 - 140, rectY3 - 150);
//			$scope.ctx.lineTo(rectX3 + 180, rectY3 + 210);
//			$scope.ctx.lineTo(rectX3 - 225, rectY3 - 50);
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			//triangle group 2 ===========================================
//			// triangle 2.1
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX + (canvas.width - 40), rectY - 30);
//			$scope.ctx.lineTo(rectX + (canvas.width + 40), rectY + 190);
//			$scope.ctx.lineTo(rectX + (canvas.width - 450), rectY + 120);
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			// triangle 2.2
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX3 + (canvas.width - 200), rectY3 - 240);
//			$scope.ctx.lineTo(rectX3 + (canvas.width + 80), rectY3 - 240);
//			$scope.ctx.lineTo(rectX3 + (canvas.width - 50), rectY3 + 460);
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			// triangle 2.3
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX2 + (canvas.width - 400), rectY2 + 140);
//			$scope.ctx.lineTo(rectX2 + (canvas.width + 20), rectY2 + 200);
//			$scope.ctx.lineTo(rectX2 + (canvas.width - 350), rectY2 + 370);
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			//triangle group 3 ===========================================
//			// triangle 3.1
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX3 - 50, rectY3 + (canvas.height - 350));
//			$scope.ctx.lineTo(rectX3 + 350, rectY3 + (canvas.height - 220));
//			$scope.ctx.lineTo(rectX3 - 100, rectY3 + (canvas.height - 120));
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			// triangle 3.2
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX + 100, rectY + (canvas.height - 380));
//			$scope.ctx.lineTo(rectX + 320, rectY + (canvas.height - 180));
//			$scope.ctx.lineTo(rectX - 275, rectY + (canvas.height + 150));
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			// triangle 3.3
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX2 - 230, rectY2 + (canvas.height - 50));
//			$scope.ctx.lineTo(rectX2 + 215, rectY2 + (canvas.height - 110));
//			$scope.ctx.lineTo(rectX2 + 250, rectY2 + (canvas.height + 130));
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			//triangle group 4 ===========================================
//			// triangle 4.1
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX3 + (canvas.width - 80), rectY3 + (canvas.height - 320));
//			$scope.ctx.lineTo(rectX3 + (canvas.width + 250), rectY3 + (canvas.height + 220));
//			$scope.ctx.lineTo(rectX3 + (canvas.width - 200), rectY3 + (canvas.height + 140));
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			// triangle 4.2
//			$scope.ctx.beginPath();
//			$scope.ctx.moveTo(rectX + (canvas.width - 100), rectY + (canvas.height - 160));
//			$scope.ctx.lineTo(rectX + (canvas.width - 30), rectY + (canvas.height + 90));
//			$scope.ctx.lineTo(rectX + (canvas.width - 420), rectY + (canvas.height + 60));
//			$scope.ctx.fillStyle = triangle_gradient;
//			$scope.ctx.fill();
//
//			// triangle 4.3
////			$scope.ctx.beginPath();
////			$scope.ctx.moveTo(rectX2 + (canvas.width - 320), rectY2 + (canvas.height - 200));
////			$scope.ctx.lineTo(rectX2 + (canvas.width - 50), rectY2 + (canvas.height - 20));
////			$scope.ctx.lineTo(rectX2 + (canvas.width - 420), rectY2 + (canvas.height + 120));
////			$scope.ctx.fillStyle = triangle_gradient;
////			$scope.ctx.fill();
//
//			$scope.ctx.restore();
//
//		} //end function draw
//
//		//call init
//		init();
//		animate();

	}
})();