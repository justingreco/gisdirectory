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
  			description: 'The City of Raleigh is a partner in the open government community and strives to become a worldwide model for an open source city. Through the Open Raleigh initiative, the City seeks to develop opportunities for economic development, commerce, increased investment, and civic engagement. This site is designed to make data easily accessible and downloadable to the public. Use this platform to search for, view, and download data in a variety of formats.',
  			url: 'http://data.ral.opendata.arcgis.com/',
  			img: 'images/openraleigh.png'
  		},
  		{title: 'Wake County GIS Data Download',
  			description: 'Wake County provides orthophotography and shapefiles free of charge on this website as a courtesy to the GIS and CAD community.',
  			url: 'http://www.wakegov.com/gis/services/Pages/data.aspx',
  			img: 'images/wakedownload.png'
  		},  		
  	];
  });
