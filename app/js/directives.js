var barmanDirectives = angular.module('barmanDirectives', []);
barmanDirectives
    .directive('orderedAt', function() {
        return {
            restrict: 'EA',
            scope: {},
            controller: ['$scope', '$timeout', function($scope, $timeout) {
                $scope.counter = 0;
                $scope.minutes = "minute";

                /*
                 * Pluralize a word according to the value of counter
                 * @param counter: The counter which we compare
                 * @param string: The word which we want to pluralize
                 *
                 * @return singular - plural
                 */
                var pluralize = function(counter, string) {
                    return (counter === 1) ? string : string + 's';
                };

                var mytimeout = $timeout($scope.onTimeout, 60000);

                /*
                 * The timer
                 */
                $scope.onTimeout = function(){
                    $scope.counter += 1;
                    $scope.minutes = pluralize($scope.counter, $scope.minutes);
                    mytimeout = $timeout($scope.onTimeout, 60000);
                };
            }],
            templateUrl: "partials/ordered-at.html"
        }
    });