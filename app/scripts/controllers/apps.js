'use strict';

/**
 * @ngdoc function
 * @name gisdirectoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gisdirectoryApp
 */
angular.module('gisdirectoryApp')
  .controller('AppsCtrl', function ($scope, $http) {
  	$http.get('data/apps.json').success(function (data) {
  		$scope.apps = data;
  	});
});
