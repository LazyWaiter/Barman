'use strict';

/* Controllers */

var barmanControllers = angular.module('barmanControllers', []);

/* Command List Controller */

barmanControllers.controller('CommandListController', ['$scope', '$http', function($scope, $http) {
    $scope.orders = [];

    /*
     * Check if the status is 'to_prepare'
     *
     * @param order : the object which want to check the status
     * @return true or false
     */
    $scope.isToPrepare = function(order) {
        return order.value.status === "to_prepare" ? true : false;
    };

    /*
     * Update status of an order and delete it from orders array
     *
     * @param order: The order which want to update the status
     */
    $scope.updateStatusToReady = function(order) {
        var index = $scope.orders.indexOf(order);

        var promise = $http.put('https://lazywaiter.couchappy.com/orders/' + order.value._id, {"status": "to_delivery"});
        promise.success(function(data, status, headers, config) {
            alert("state changed");
            if (index !== -1) {
                delete $scope.orders[index];
            }
        });

        promise.error(function(data, status, headers, config) {
            alert("error: Data not updated");
        });
    };

    /*
     * Get the orders from couchDB
     *
     * @param array: it's where we push the data
     */
    var getData = function() {
        var promise = $http({method: 'GET', url: 'https://lazywaiter.couchappy.com/orders/_design/orders/_view/all'})
        promise.success(function(data, status, headers, config) {
            $scope.orders = data.rows;
        });
        promise.error(function(data, status, headers, config) {
            alert("error: Data not found");
        });
    };

    getData();
}]);
