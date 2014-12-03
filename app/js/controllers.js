'use strict';

/* Controllers */

var barmanControllers = angular.module('barmanControllers', []);

/* Command List Controller */

barmanControllers.controller('CommandListController', ['$scope', '$http', function($scope, $http) {

    var promise = $http({method: 'GET', url: 'https://lazywaiter.couchappy.com/orders/_design/orders/_view/all'})
    promise.success(function(data, status, headers, config) {
        $scope.orders = data.rows;
    });
    promise.error(function(data, status, headers, config) {
        alert("error: Data not found");
    });
}]);
