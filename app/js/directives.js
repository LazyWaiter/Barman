var barmanDirectives = angular.module('barmanDirectives', []);
barmanDirectives
    .directive('orderedAt', function() {
        return {
            restrict: 'EA',
            scope: {},
            controller: ['$scope', '$timeout', function($scope, $timeout) {
                $scope.counter = 0;

                /*
                 * The timer
                 */
                $scope.onTimeout = function(){
                    $scope.counter += 1;
                    $scope.pluralize =  ($scope.counter === 1) ? '' : 's';
                    mytimeout = $timeout($scope.onTimeout, 60000);
                };

                var mytimeout = $timeout($scope.onTimeout, 60000);
            }],
            templateUrl: "partials/ordered-at.html"
        }
    });