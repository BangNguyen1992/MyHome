(function () {

	'use strict';

	angular
		.module('myApp', [
		'ui.router',
		'ui.bootstrap',
		'colorpicker.module',
		'vintagejs',
		'ngAria',
		'ngAnimate',
		'ngMaterial'
	])
		.config(config)
		.run(run);

	config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider'];
	run.$inject = ['$rootScope', '$window'];

	//Auto scroll page to top when change state
	function run($rootScope, $window) {
		$rootScope.$on('$stateChangeSuccess', function () {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		});
		
		$rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (toState.external) {
        event.preventDefault();
        $window.open(toState.url, '_self');
      }
    });
	}

	function config($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
		$urlRouterProvider.otherwise('/home');
//		$locationProvider.html5Mode({
//			enabled: true,
//			requireBase: false
//		});

		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|coui|data):/);

		//		$locationProvider.html5Mode(true).hashPrefix('!')

		$stateProvider
			.state('nav', {
				//        abstract:true,
				templateUrl: '../index.html',
				controller: 'NavCtrl'
					//				controllerAs: 'vm'
			})
			.state('home', {
				url: '/home',
				templateUrl: 'components/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('projects', {
				url: '/projects',
				templateUrl: 'components/projects/projects.html',
				controller: 'ProjectsCtrl',
				controllerAs: 'vm'
			})
			.state('drumKit', {
				url: '/drum-kit',
				templateUrl: 'components/JSDrumKit/drum-kit.html',
				controller: 'DrumKitCtrl',
				controllerAs: 'vm'
			})
			.state('ImgEditor', {
				url: '/img-editor',
				templateUrl: 'components/ImgEditor/imgEditor.html',
				controller: 'ImgEditorCtrl'
			})
			.state('ImgGradient', {
				url: '/gradient-effect',
				templateUrl: 'components/ImgGradient/imgGradient.html',
				controller: 'GradientCtrl'
			})
			.state('ImgEditorAdv', {
				url: '/img-editor-adv',
				templateUrl: 'components/ImgEditorAdv/imgEditorAdv.html',
				controller: 'ImgEditorAdvCtrl'
			})
			.state('photoBooth', {
				url: '/photo-booth',
				views: {
					'': {
						templateUrl: 'components/photoBooth/photoBooth.html',
						controller: 'PhotoBoothCtrl',
						controllerAs: 'vm'
					},
					//							'create@exp': {
					//								templateUrl: 'components/funWebcam/webcam.html',
					//								controller: 'CreatePatternCtrl',
					//								controllerAs: 'vm'
					//							}
				}
			})
		.state('live2d', {
       url: 'https://asuna-test.herokuapp.com/',
       external: true
  })
	}

})();