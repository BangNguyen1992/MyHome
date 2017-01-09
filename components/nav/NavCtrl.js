(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('NavCtrl', NavCtrl);

	NavCtrl.$inject = ['$scope'];

	function NavCtrl($scope) {

		$scope.selected = 0;
		$scope.select = function (index) {
			$scope.selected = index;
		};

//		$scope.menus = [
//
//			{
//				state: 'nav.home',
//				title: 'Home',
//				class: 'page-scroll',
//				active: 'active'
//      },
//			{
//				state: ' ',
//				title: 'My Projects',
//				class: 'page-scroll',
//				active: 'active'
//      }
//
//
//  ];

		
	}
})();