'use strict';

/**
 * @ngdoc function
 * @name gisdirectoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gisdirectoryApp
 */
angular.module('gisdirectoryApp')
  .controller('MainCtrl', function ($scope, parallaxHelper) {
	$scope.background = parallaxHelper.createAnimator(-0.3);
  });
