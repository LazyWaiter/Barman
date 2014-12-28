var barmanDirectives = angular.module('barmanDirectives', []);
barmanDirectives
    .directive('orderedAt', function() {
        return {
            restrict: 'EA',
            scope: {
                order: "="
            },
            controller: ['$scope', '$timeout', 'ControlTime', function($scope, $timeout, ControleTime) {


                $scope.counter = ControleTime.getOrderDateUntilNowInMinutes($scope.order);
                $scope.pluralize =  ($scope.counter === 1) ? '' : 's';

                /*
                 * The timer
                 */
                $scope.onTimeout = function() {
                    $scope.counter = ControlTime.getOrderDateUntilNowInMinutes($scope.order);
                    $scope.pluralize =  ($scope.counter === 1) ? '' : 's';
                    orderTimeout = $timeout($scope.onTimeout, 60000);
                };

                var orderTimeout = $timeout($scope.onTimeout, 60000);
            }],
            templateUrl: "partials/ordered-at.html"
        }
    });