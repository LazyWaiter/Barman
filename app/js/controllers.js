'use strict';

/* Controllers */

var barmanControllers = angular.module('barmanControllers', []);

var getOrders = function(array) {

};

/* Command List Controller */

barmanControllers.controller('CommandListController', ['$scope', '$http', function($scope, $http) {
    $scope.orders = [];

    var getData = function(array) {
        var promise = $http({method: 'GET', url: 'https://lazywaiter.couchappy.com/orders/_design/orders/_view/all'})
        promise.success(function(data, status, headers, config) {
            // Get orders with "to_prepare" state
            for(var i = 0, l = data.rows.length; i < l; i++) {
                if (data.rows[i].value.state === "to_prepare") {
                    array.push(data.rows[i].value);
                }
            }
        });
        promise.error(function(data, status, headers, config) {
            alert("error: Data not found");
        });
    };


    getData($scope.orders);

    $scope.updateStatusToReady = function(order) {
        order.state = "to_delivery";
        //order._deleted = true;
        var index = $scope.orders.indexOf(order);

        var promise = $http.put('https://lazywaiter.couchappy.com/orders/' + order._id, order);
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
}]);
