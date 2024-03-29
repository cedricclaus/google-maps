"use strict";

angular.module('app', [])

    .controller('Ctrl', function($scope) {
        $scope.maps = [
            { label:'legende1' , center: {lat: 47.211, lng: -1.566}, zoom: 12 },
            { label:'legende2' , center: {lat: 37.423, lng: -122.086}, zoom: 9 }
        ];
    })

    .directive('gmaps', function () {
        return {
            restrict: 'EA',
            transclude : true,
            templateUrl : 'gmaps.html',
            replace: false,
            scope: {
                center : '=',
                zoom : '='
            },
            link: function (scope, element, attrs) {
                //element.addClass('gmaps');

                var currentElement = element[0];

                var mapOptions = {
                    center: { lat: scope.center.lat, lng: scope.center.lng},
                    zoom: scope.zoom
                };
                var map = new google.maps.Map(element.find('div')[0],
                    mapOptions);

                scope.$watch('zoom',function(newValue, oldValue){
                        map.setZoom( newValue);
                });
                scope.$watch('center',function(newValue, oldValue){
                    map.setCenter( newValue);
                },true);


                google.maps.event.addListener(map, 'zoom_changed', function () {
                    if(scope.zoom != map.getZoom()){
                        scope.$apply(function(){
                            scope.zoom = map.getZoom();
                        });
                    }


                });
                google.maps.event.addListener(map, 'center_changed', function () {

                    scope.$applyAsync(function(){
                        scope.center.lat=  map.getCenter().lat();
                        scope.center.lng=  map.getCenter().lng();
                    });

                });
                scope.snapshots= [];
                scope.addMarker= function(){
                    new google.maps.Marker({
                        position: new google.maps.LatLng(scope.center.lat, scope.center.lng),
                        map: map,
                        title: scope.markerLabel
                    });
                    scope.snapshots.push({
                        lat :  scope.center.lat,
                        lng :  scope.center.lng,
                        zoom :  scope.zoom,
                        label :  scope.markerLabel
                    });
                    scope.markerLabel = '';
                };

                scope.goto = function(snapshot){
                    scope.center.lat = snapshot.lat;
                    scope.center.lng = snapshot.lng;
                    scope.zoom = snapshot.zoom;
                }
            }
        };
    });
