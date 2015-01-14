'use strict';

/**
 * @ngdoc function
 * @name gisdirectoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gisdirectoryApp
 */
angular.module('gisdirectoryApp')
  .controller('DownloadCtrl', ['$scope', '$http', 'leafletData', function ($scope, $http, leafletData) {
    $scope.email = "";
    $scope.formats = [
            "Shapefile - SHP - .shp",
            "File Geodatabase - GDB - .gdb",
            "Autodesk AutoCAD - ACAD - .dxf",
            "Autodesk AutoCAD - ACAD - .dwg",
            "Bentley Microstation Design (V8) - DGN_V8 - .dgn"
        ];
    $scope.selectedFormat = $scope.formats[0];
    $scope.selectedDataset = []; //$scope.example1data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];    
    $scope.selectSettings = {showCheckAll: false, showUncheckAll: false};
    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        },
        raleigh: {
        	lat: 35.780556,
        	lng: -78.638889,
        	zoom: 11
        }, 
        areaSet: false
    });
    $http.get('http://maps.raleighnc.gov/arcgis/rest/services/Geoprocessing/DataDownload/GPServer/Data%20Download%20Task?f=json').success(function (data) {
         $scope.datasets = [];
         angular.forEach(data.parameters[0].choiceList, function (item) {
             $scope.datasets.push({label: item.substr(item.indexOf("\\")+1), id: item});
         });
    });
    leafletData.getMap().then(function(map) {

        var drawnItems = L.featureGroup().addTo(map),
            drawCtrl = new L.Control.Draw(
                {
                    edit: {
                            featureGroup: drawnItems
                        }, 
                    draw: {               
                        rectangle: {
                            shapeOptions: {
                                color: 'purple'
                            },
                            repeatMode: true
                        },
                        polygon: {
                            shapeOptions: {
                                color: 'purple'
                            },
                            allowIntersection: false,
                            drawError: {
                                color: 'orange',
                                timeout: 1000
                            },
                            showArea: true,
                            metric: false,
                            repeatMode: true
                        },
                        circle: false,
                        marker: false, 
                        polyline: false
                    }
                }
            );
            
        map.addControl(drawCtrl);
        $scope.go = function () {
            var shape = {"geometryType":"esriGeometryPolygon", "features":[{"geometry":{"rings":[[]],"spatialReference":{"wkid":4326}}}], "sr":{"wkid": 4326}};
            drawnItems.eachLayer(function (layer) {
                angular.forEach(layer.getLatLngs(), function (latlng) {
                    shape.features[0].geometry.rings[0].push([latlng.lng, latlng.lat]);
                });
            });

            var datasets = [];
            angular.forEach($scope.selectedDataset, function (dataset) {
                datasets.push(dataset.id);
            });


            var config = {
                params: {
                    To: $scope.email,
                    f: "json",
                    Area_of_Interest: JSON.stringify(shape),
                    Raster_Format: "ESRI GRID - GRID",
                    Feature_Format: $scope.selectedFormat,
                    Layers_to_Clip: JSON.stringify(datasets)                 
                }
            }
            $http.get('https://maps.raleighnc.gov/arcgis/rest/services/Geoprocessing/DataDownload/GPServer/Data%20Download%20Task/submitJob/', 
                config).success(function (e) {

                });
        };




      map.on('draw:created', function (e) {
        var layer = e.layer;
        drawnItems.clearLayers();
        drawnItems.addLayer(layer);
        $scope.areaSet = true;
        var area = LGeo.area(e.layer);
        console.log(area / 2589988.110336);
        $scope.area = area / 2589988.110336
      });

      map.on('draw:editstop', function (e) {
        
        var area = LGeo.area(drawnItems.getLayers()[0]);
        console.log(area / 2589988.110336);
        $scope.area = area / 2589988.110336
      });      

function polygonArea(points) {
  var sum = 0.0;
  var length = points.length;
  if (length < 3) {
    return sum;
  }
  points.forEach(function(d1, i1) {
    var i2 = (i1 + 1) % length;
    var d2 = points[i2];
    sum += (d2[1] * d1[0]) - (d1[1] * d2[0]);
  });
  return sum / 2;
}

      map.on('draw:deleted', function () {
        drawnItems.clearLayers();
        $scope.area = 0;
        $scope.areaSet = false;
      });
   });
}]);
