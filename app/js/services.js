'use strict';

/* Services */

var barmanServices = angular.module('barmanServices', []);

barmanServices.factory('Order', [ '$http', '$interval', function ($http, $interval) {

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
        orders : [],

        /*
         * Insert a new order in database
         */
        insertOrder: function() {
            var order =  {
                "tableNumber" : 88, // Number of the table
                "createdAt" : new Date().getTime(), // date creation of the command
                "products" : [ // all product in the command
                    {
                        "name" : "Beer", // name of the product
                        "quantity" : "1", // quantity for the product
                        "price" : "3" //price of the product
                    }
                ],
                "status" : "to_prepare" // command status
            };

            $http.post('https://lazywaiter.couchappy.com/orders/', order);
        },

        /*
         * Get the orders from couchDB
         *
         * @param array: it's where we push the data
         */
        fetchOrders: function () {
            var self = this;
            var promise = $http.get('https://lazywaiter.couchappy.com/orders/_design/orders/_view/all');

            promise.success(function(data, status, headers, config) {
                for (var i = 0, l = data.rows.length; i < l; i++) {
                    // Push only the new entries
                    if (data.rows[i].value.status === "to_prepare") {
                        if (!checkIfAlreadyExist(self.orders, data.rows[i])) {
                            self.orders.push(data.rows[i]);
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
        updateStatusToReady: function(order) {
            var self = this;
            var index = this.orders.indexOf(order);
            order.value.status = "to_delivery";

            var promise = $http.put('https://lazywaiter.couchappy.com/orders/' + order.id, order.value);
            promise.success(function(data, status, headers, config) {
                if (index !== -1) {
                    self.orders.splice(index, 1);
                }
            });

            promise.error(function(data, status, headers, config) {
                order.value.status = "to_prepare";
                alert("error: Data not updated");
            });
        },

        /*
         * Refresh data every @param seconds
         *
         * @param time: the time which want to set
         */
        startFetchingEvery: function(time) {
            var self = this;

            $interval(function() {
                self.fetchOrders();
            }, time);
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
            var date = order.value.createdAt;

            return Math.floor((now - date) / 60000);
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
