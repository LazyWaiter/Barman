'use strict';

/* Controllers */

var barmanControllers = angular.module('barmanControllers', []);

barmanControllers.controller('CommandListController', ['$scope', 'Order', 'ControlTime', '$interval', function($scope, Order, ControlTime,$interval) {
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
    $scope.updateStatusToReady = function(object) {
        var order = object.value;
        order.status = "to_delivery";

        Order.updateOrderStatusToReady($scope, order);
    };

    $scope.getOrderDateUntilNowInMinutes = ControlTime.getOrderDateUntilNowInMinutes;

    /*
     * Function to add new order in the order scope array for test
     *
     */
    $scope.addCommand = function() {
        var orderTest = {};
        orderTest.value= {
            "tableNumber" : "42", // Number of the table
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
        $scope.orders.push(orderTest);
    };

    Order.fetchOrders($scope);

    $scope.checkOrderControlTimes = ControlTime.checkOrderControlTimes;

    /*
     * Refresh data every 60 seconds
     *
     */
    $interval(function() {
        Order.fetchOrders($scope);
    }, 60000);
}]);

/* Command List Controller */
