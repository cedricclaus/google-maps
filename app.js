"use strict";

angular.module('app', [])

    .controller('Ctrl', function($scope) {
        $scope.maps = [
            { center: {lat: 47.211, lng: -1.566}, zoom: 12 },
            { center: {lat: 37.423, lng: -122.086}, zoom: 9 }
        ];
    })

    .directive('gmaps', function () {
        return {
            restrict: 'A',
            scope: {
                center : '=',
                zoom : '='
            },
            link: function (scope, element, attrs) {
                element.addClass('gmaps');

                var currentElement = element[0];

                var mapOptions = {
                    center: { lat: scope.center.lat, lng: scope.center.lng},
                    zoom: scope.zoom
                };
                var map = new google.maps.Map(currentElement,
                    mapOptions);

                scope.$watch('zoom',function(newValue, oldValue){
                        map.setZoom( newValue);
                });
            }
        };
    });
