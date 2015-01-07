var barmanDirectives = angular.module('barmanDirectives', []);
barmanDirectives
    .directive('orderedAt', function() {
        return {
            restrict: 'EA',
            scope: {
                order: "="
            },
            controller: ['$scope', '$timeout', function($scope, $timeout) {
                var getOrderDateUntilNowInMinutes = function(date) {
                    var now = new Date().getTime();

                    return Math.floor((now - date) / 60000);
                };

                $scope.counter = getOrderDateUntilNowInMinutes($scope.order.value.createdAt);
                $scope.pluralize =  ($scope.counter === 1) ? '' : 's';

                /*
                 * The timer
                 */
                $scope.onTimeout = function() {
                    $scope.counter = getOrderDateUntilNowInMinutes($scope.order.value.createdAt);
                    $scope.pluralize =  ($scope.counter === 1) ? '' : 's';
                    orderTimeout = $timeout($scope.onTimeout, 60000);
                };

                var orderTimeout = $timeout($scope.onTimeout, 60000);
            }],
            templateUrl: "partials/ordered-at.html"
        }
    });
