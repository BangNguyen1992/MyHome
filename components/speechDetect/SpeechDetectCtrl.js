(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('SpeechDetectCtrl', SpeechDetectCtrl);

	// SpeechDetectCtrl.$inject = ['$scope'];

	function SpeechDetectCtrl() {

		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		var myRecognition = new SpeechRecognition();
		myRecognition.interimResults = true;
		// myRecognition.continuous = false;
		myRecognition.autoRestart = false;
		myRecognition.lang = "en-US";

		console.log(myRecognition)
		var p = document.createElement('p');
		var words = document.querySelector('.words');
		words.appendChild(p);

		myRecognition.onresult = (e) => {
			// console.log(e);
			var transcript = Array.from(e.results)
				.map(result => result[0])
				.map(result => result.transcript)
				.join('');

			p.textContent = transcript;
			if (e.results[0].isFinal) {
				p = document.createElement('p');
				words.appendChild(p);
			};
			console.log(transcript);
		};

		myRecognition.onerror = (e) => {
			console.log(e);
		};

		// myRecognition.onstart = () => {
		// 	console.log('Speech recognition service has started');
		// }

		var start = () => {
			myRecognition.start();
		};

		myRecognition.addEventListener('end', start);
		document.querySelector('#speech').addEventListener("click", start);

	};
})();