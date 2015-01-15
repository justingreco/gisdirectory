'use strict';

/**
 * @ngdoc function
 * @name gisdirectoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gisdirectoryApp
 */
angular.module('gisdirectoryApp')
  .controller('DataCtrl', function ($scope, $http) {
  	$http.get('data/data.json').success(function (data) {
  		$scope.data = data;
  	});
  	$scope.sites = [
  		{title: 'Open Raleigh GIS Data',
  			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  			url: 'http://data.ral.opendata.arcgis.com/',
  			img: 'images/openraleigh.png'
  		},
  		{title: 'Wake County GIS Data Download',
  			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  			url: 'http://www.wakegov.com/gis/services/Pages/data.aspx',
  			img: 'images/wakedownload.png'
  		},  		
  	];
  });
