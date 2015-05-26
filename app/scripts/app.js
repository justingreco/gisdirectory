'use strict';
/**
 * @ngdoc overview
 * @name gisdirectoryApp
 * @description
 * # gisdirectoryApp
 *
 * Main module of the application.
 */
angular
  .module('gisdirectoryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'leaflet-directive',
    'duParallax',
    'angularjs-dropdown-multiselect',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/data', {
        templateUrl: 'views/data.html',
        controller: 'DataCtrl'
      })
      .when('/apps', {
        templateUrl: 'views/apps.html',
        controller: 'AppsCtrl'
      })
      .when('/download', {
        templateUrl: 'views/download.html',
        controller: 'DownloadCtrl'
      })                  
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/about'
      });
      $locationProvider.html5Mode(true);
  })  
  .controller('IndexCtrl', function ($scope, $rootScope, $document, $location, parallaxHelper) {
    $scope.background = parallaxHelper.createAnimator(-0.3);
    var path = function () {return $location.path();};
    $rootScope.$watch(path, function (newVal, oldVal) {
      $scope.activetab = newVal;
    });
/*      $('.navbar').affix({
          offset: {
              top: $('.jumbotron').height()
          }   
      });*/
  });;
