'use strict';

/* Services */

var barmanServices = angular.module('barmanServices', []);

barmanServices.factory('Order', [ '$http', function ($http) {
    /*
     * Check if an order already exists in the scope array
     * @param array: The scope array
     * @param order: The order
     *
     * @return true or false
     */
    var checkIfAlreadyExist = function(array, order) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i].id === order.id) {
                return true;
            }
        }

        return false;
    };

    return {
        /*
         * Get the orders from couchDB
         *
         * @param array: it's where we push the data
         */
        fetchOrders: function ($scope) {
            var promise = $http.get('https://lazywaiter.couchappy.com/orders/_design/orders/_view/all');

            promise.success(function(data, status, headers, config) {
                for (var i = 0, l = data.rows.length; i < l; i++) {
                    // Push only the new entries
                    if (data.rows[i].value.status === "to_prepare") {
                        if (!checkIfAlreadyExist($scope.orders, data.rows[i])) {
                            $scope.orders.push(data.rows[i]);
                        }
                    }
                }
            });
            promise.error(function(data, status, headers, config) {
                alert("error: Data not found");
            });
        },
        /*
         * Update status of an order
         *
         * @param $scope: The scope which we modify
         * @param order: The order which want to update the status
         */
        updateOrderStatusToReady: function($scope, order) {
            var index = $scope.orders.indexOf(order);

            var promise = $http.put('https://lazywaiter.couchappy.com/orders/' + order._id, order);
            promise.success(function(data, status, headers, config) {
                alert("state changed");
                if (index !== -1) {
                    delete $scope.orders[index];
                }
            });

            promise.error(function(data, status, headers, config) {
                order.status = "to_prepare";
                alert("error: Data not updated");
            });
        }
    }
}])
