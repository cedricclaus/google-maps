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
            scope: false,
            link: function (scope, element, attrs) {

                var mapOptions = {
                    center: { lat: -34.397, lng: 150.644},
                    zoom: 8
                };
                var currentElement = element[0];
                var map = new google.maps.Map(currentElement,
                    mapOptions);
                element.addClass('gmaps');

            }
        };
    });
