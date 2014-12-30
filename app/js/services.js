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
}]);

barmanServices.factory("ControlTime", [function() {

    return {
        /*
         * get the order's date until now in minutes
         * @param: The order which want to get the date
         *
         * @return: Integer (the order's date until now)
         */
        getOrderDateUntilNowInMinutes: function(order) {
            var now = new Date().getTime();
            var orderDate = order.value.createdAt;
            return Math.floor((now - orderDate)/ 60000)
        },

        /*
         * Check the control times for an order
         * @param: the order which want to check the control times
         *
         * @return: string (green, orange or red)
         */
        checkOrderControlTimes: function (order) {
            var minutes = this.getOrderDateUntilNowInMinutes(order);
            if (minutes > 10) {
                return "red";
            } else if (minutes <= 10 && minutes > 5) {
                return "orange";
            } else {
                return "green";
            }
        }
    }

}]);
