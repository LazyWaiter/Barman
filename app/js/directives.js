var barmanDirectives = angular.module('barmanDirectives', []);
barmanDirectives
    .directive('orderedAt', function() {
        return {
            restrict: 'EA',
            scope: {
                order: "="
            },
            controller: ['$scope', '$timeout', function($scope, $timeout) {

                var now = new Date().getTime();
                var orderDate =$scope.order.value.createdAt;
                $scope.counter = Math.floor((now - orderDate)/ 60000);
                $scope.pluralize =  ($scope.counter === 1) ? '' : 's';

                /*
                 * The timer
                 */
                $scope.onTimeout = function(){
                    $scope.counter += 1;
                    $scope.pluralize =  ($scope.counter === 1) ? '' : 's';
                    orderTimeout = $timeout($scope.onTimeout, 60000);
                };

                var orderTimeout = $timeout($scope.onTimeout, 60000);
            }],
            templateUrl: "partials/ordered-at.html"
        }
    });